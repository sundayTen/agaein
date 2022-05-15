import { ApolloError } from 'apollo-server-errors';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { sendEmail } from '../../../common/utils/email';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        const { boardType, articleDetail } = args;
        const {
            breedId,
            name,
            feature,
            gender,
            location,
            foundDate,
            lostDate,
            gratuity,
            alarm,
            password,
            keyword,
            email,
            age,
            title,
            content,
        } = articleDetail;

        // @TODO validation 확인해야 됨.

        const now = new Date();
        const articleForm = {
            userId: 1,
            view: 0,
            type: boardType,
            createdAt: now,
            updatedAt: now,
        };

        const article: any = {
            userId: 1,
            view: 0,
            type: boardType,
            createdAt: now,
            updatedAt: now,
        };

        if (
            password === undefined &&
            context.req.headers.authorization &&
            context.req.headers.authorization.split(' ')[1]
        ) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            articleForm.userId = (<any>jwtToken).userId;
            article.userId = (<any>jwtToken).userId;
        }

        return await knex.transaction(async (trx: any) => {
            return await knex('article')
                .transacting(trx)
                .insert(articleForm)
                .returning('id')
                .then(async (articleId: any) => {
                    article.id = articleId[0];
                    const articleDetailForm: any = {
                        LFG: {
                            articleId: article.id,
                            breedId,
                            name,
                            feature,
                            gender,
                            location,
                            foundDate,
                            alarm,
                            password,
                            email,
                            age,
                        },
                        LFP: {
                            articleId: article.id,
                            breedId,
                            name,
                            feature,
                            gender,
                            location,
                            lostDate,
                            gratuity,
                            alarm,
                            password,
                            email,
                            age,
                        },
                        REVIEW: {
                            articleId: article.id,
                            title,
                            content,
                        },
                    };
                    return await knex(boardType)
                        .transacting(trx)
                        .insert(articleDetailForm[boardType])
                        .returning('id')
                        .then(async (articleDetailId: any) => {
                            articleDetailForm[boardType].id = articleDetailId[0];
                            if (boardType === 'LFG' || boardType === 'LFP') {
                                articleDetailForm[boardType].keyword = keyword;
                            }
                            article.articleDetail = articleDetailForm[boardType];
                            article.articleDetail.articleType = boardType;

                            if (keyword !== undefined) {
                                const keywordForm: any = [];
                                keyword.forEach(async (word: string) => {
                                    keywordForm.push({ keyword: word });
                                });

                                const keywordId = await knex('keyword')
                                    .insert(keywordForm)
                                    .onConflict('keyword')
                                    .merge()
                                    .returning('id');

                                if (keywordId[0] !== undefined) {
                                    const articleKeywordForm: any = [];
                                    keywordId.forEach(async (id: string) => {
                                        articleKeywordForm.push({ articleId: article.id, keywordId: id });
                                    });
                                    await knex('article_keyword').transacting(trx).insert(articleKeywordForm);
                                }
                            }

                            args.files.forEach(async (file: any, idx: Number) => {
                                const { createReadStream, mimetype } = await file;
                                const stream = createReadStream();

                                const filename =
                                    article.id + '_' + idx + '_' + Date.now() + '.' + mimetype.split('/')[1];

                                const imageForm = {
                                    articleId: article.id,
                                    url: 'https://www.agaein.com/file/image/' + filename,
                                };

                                await knex('image').transacting(trx).insert(imageForm);

                                const out = require('fs').createWriteStream('image/' + filename);
                                await stream.pipe(out);
                                await stream.on('close', () => {
                                    console.log(`store ${filename}`);
                                });
                            });
                        })
                        .catch((err: any) => {
                            console.error('createArticle articleDetail & Keyword & Image에서 에러발생');
                            console.trace();

                            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                        });
                })
                .then(() => {
                    return article;
                })
                .catch((err: any) => {
                    console.error('createArticle에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                });
        });
    },
    updateArticle: async (_: any, args: any, context: any) => {
        const articleData = await knex('article').where('id', args.id).first();

        if (articleData === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        const { id, articleDetail } = args;
        const { password, keyword } = articleDetail;

        // @TODO validation 확인해야 됨.

        const now = new Date();
        const articleForm: any = {
            updatedAt: now,
        };

        const article: any = {
            userId: 1,
            updatedAt: now,
        };

        if (password) {
            if (password !== articleData.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            const articleUser = await knex('article').where('id', id).first('userId');
            if (articleUser.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
            article.userId = articleUser.userId;
        } else {
            throw new ApolloError('Must Need AccessToken or Password', 'UNAUTHENTICATED');
        }

        return await knex.transaction(async (trx: any) => {
            return await knex('article')
                .transacting(trx)
                .update(articleForm)
                .where('id', id)
                .returning('*')
                .then(async (updatedArticle: any) => {
                    article.id = updatedArticle[0].id;
                    article.view = updatedArticle[0].view;
                    article.type = updatedArticle[0].type;
                    article.createdAt = updatedArticle[0].createdAt;

                    const boardType = article.type;

                    const articleDetailForm: any = {};
                    for (let key in articleDetail) {
                        if (key === 'keyword') {
                            continue;
                        }
                        articleDetailForm[key] = articleDetail[key];
                    }

                    return await knex(boardType)
                        .transacting(trx)
                        .update(articleDetailForm)
                        .where('article_id', id)
                        .returning('*')
                        .then(async (updatedArticleDetail: any) => {
                            article.articleDetail = updatedArticleDetail[0];
                            article.articleDetail.articleType = boardType;

                            if (keyword !== undefined) {
                                await knex('article_keyword').transacting(trx).where('article_id', article.id).del();

                                const keywordForm: any = [];
                                keyword.forEach(async (word: string) => {
                                    keywordForm.push({ keyword: word });
                                });

                                const keywordId = await knex('keyword')
                                    .insert(keywordForm)
                                    .onConflict('keyword')
                                    .merge()
                                    .returning('id');

                                if (keywordId[0] !== undefined) {
                                    const articleKeywordForm: any = [];
                                    keywordId.forEach(async (id: string) => {
                                        articleKeywordForm.push({ articleId: article.id, keywordId: id });
                                    });
                                    await knex('article_keyword').transacting(trx).insert(articleKeywordForm);
                                }
                            }

                            if (args.files[0]) {
                                await knex('image').transacting(trx).where('article_id', article.id).del();

                                args.files.forEach(async (file: any, idx: Number) => {
                                    const { createReadStream, mimetype } = await file;
                                    const stream = createReadStream();

                                    const filename =
                                        article.id + '_' + idx + '_' + Date.now() + '.' + mimetype.split('/')[1];

                                    const imageForm = {
                                        articleId: article.id,
                                        url: 'https://www.agaein.com/file/image/' + filename,
                                    };

                                    await knex('image').transacting(trx).insert(imageForm);

                                    const out = require('fs').createWriteStream('image/' + filename);
                                    await stream.pipe(out);
                                    await stream.on('close', () => {
                                        console.log(`store ${filename}`);
                                    });
                                });
                            }
                        })
                        .catch((err: any) => {
                            console.error('updateArticle articleDetail & Keyword & Image에서 에러발생');
                            console.trace();

                            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                        });
                })
                .then(() => {
                    return article;
                })
                .catch((err: any) => {
                    console.error('updateArticle에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                });
        });
    },
    updateComment: async (_: any, args: any, context: any) => {
        const comment = await knex('comment').where('id', args.id).first();

        if (comment === undefined || comment.content === '') {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        const { id, content, password } = args;

        if (content === '') {
            throw new ApolloError('Empty Content', 'BAD_USER_INPUT');
        }

        if (password) {
            if (password !== comment.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            const commentUser = await knex('comment').where('id', id).first('userId');
            if (commentUser.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Must Need AccessToken or Password', 'UNAUTHENTICATED');
        }

        const now = new Date();
        const commentForm = {
            content,
            updatedAt: now,
        };

        try {
            const comments = await knex('comment').update(commentForm).where('id', id).returning('*');
            const comment = comments[0];
            return comment;
        } catch (err: any) {
            console.error('createComment에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    createComment: async (_: any, args: any, context: any) => {
        const now = new Date();
        const { articleId, commentId, content, password } = args;
        const commentForm = {
            userId: 1,
            articleId,
            commentId,
            content,
            password,
            createdAt: now,
            updatedAt: now,
        };

        if (commentId) {
            const comment = await knex('comment').where('id', commentId).first();
            if (comment.commentId) {
                throw new ApolloError('Comment Depth Error', 'INTERNAL_SERVER_ERROR');
            }
        }

        if (
            password === undefined &&
            context.req.headers.authorization &&
            context.req.headers.authorization.split(' ')[1]
        ) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            commentForm.userId = (<any>jwtToken).userId;
        }

        try {
            const comments = await knex('comment').insert(commentForm).returning('*');
            const comment = comments[0];
            const article = await knex('article').where('id', articleId).first();
            const articleDetail = await knex(`${article.type}`).where('article_id', articleId).first();
            const user = await knex('user').where('id', article.userId).first();

            if (articleDetail.alarm ) {
                user.email && sendEmail(user.email, articleId, comment.content);
            }

            return comment;
        } catch (err: any) {
            console.error('createComment에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    deleteArticle: async (_: any, args: any, context: any) => {
        const article = await knex('article').where('id', args.id).first();

        if (article === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (args.password) {
            const password = await knex(article.type).where('articleId', args.id).select('password').first();
            if (args.password !== password.password) {
                throw new ApolloError('Wrong Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (article.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Unautorized Token', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Wrong Route', 'UNAUTHENTICATED');
        }

        await knex('article').where('id', args.id).del();

        return args.id;
    },
    deleteComment: async (_: any, args: any, context: any) => {
        const comment = await knex('comment').where('id', args.id).first();

        if (comment === undefined || comment.content === '') {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (args.password) {
            if (args.password !== comment.password) {
                throw new ApolloError('Wrong Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (comment.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Unautorized Token', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Wrong Route', 'UNAUTHENTICATED');
        }

        const now = new Date();
        const commentForm = {
            content: '',
            updatedAt: now,
        };

        await knex('comment').update(commentForm).where('id', args.id);

        return args.id;
    },
};

export default articleMutations;
