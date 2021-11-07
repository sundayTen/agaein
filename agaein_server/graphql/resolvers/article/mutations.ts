import { ApolloError } from 'apollo-server-errors';
import { readAccessToken } from '../../../common/auth/jwtToken';
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
            // 유저 데이터 넣어야 함.
            user: {},
            view: 0,
            type: boardType,
            comments: [],
            images: [],
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
        }

        const user = await knex('user').where('id', articleForm.userId).first();
        article.user = user;

        return await knex.transaction(async (trx: any) => {
            return await knex('article')
                .transacting(trx)
                .insert(articleForm)
                .returning('id')
                .then((articleId: any) => {
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
                            age,
                        },
                        REVIEW: {
                            articleId: article.id,
                            title,
                            content,
                        },
                    };
                    return knex(boardType)
                        .transacting(trx)
                        .insert(articleDetailForm[boardType])
                        .returning('id')
                        .then((articleDetailId: any) => {
                            articleDetailForm[boardType].id = articleDetailId[0];
                            article.articleDetail = articleDetailForm[boardType];

                            args.files.forEach(async (file: any) => {
                                const { createReadStream, filename } = await file;
                                const stream = createReadStream();

                                const imageForm = {
                                    articleId: article.id,
                                    url: 'https://www.agaein.com/file/image/' + filename,
                                };

                                knex('image')
                                    .transacting(trx)
                                    .insert(imageForm)
                                    .returning('*')
                                    .then((image: any) => {
                                        article.images.push(image[0]);
                                    });

                                const out = require('fs').createWriteStream('image/' + filename);
                                await stream.pipe(out);
                                await stream.on('close', () => {
                                    console.log(`store ${filename}`);
                                });
                            });
                        });
                })
                .then(() => {
                    return article;
                })
                .catch(() => {
                    console.error('createArticle에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
                });
        });
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
            return comment;
        } catch {
            console.error('createComment에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
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
        }

        await knex('article').where('id', args.id).del();

        return args.id;
    },
    deleteComment: async (_: any, args: any, context: any) => {
        const comment = await knex('comment').where('id', args.id).first();

        if (comment === undefined) {
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
        }

        await knex('comment').where('id', args.id).del();

        return args.id;
    },
};

export default articleMutations;
