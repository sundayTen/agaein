import { ApolloError } from 'apollo-server-errors';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        const { boardType, content, articleDetail } = args;
        const { breedId, name, feature, gender, location, foundDate, lostDate, gratuity } = articleDetail;

        // @TODO validation 확인해야 됨.

        const now = new Date();
        const articleForm = {
            userId: 1,
            view: 0,
            type: boardType,
            content,
            createdAt: now,
            updatedAt: now,
        };

        const article: any = {
            // 유저 데이터 넣어야 함.
            user: {},
            view: 0,
            content,
            type: boardType,
            comments: [],
            images: [],
            createdAt: now,
            updatedAt: now,
        };

        if (context.req.headers.accesstoken) {
            const jwtToken = readAccessToken(context.req.headers.accesstoken);
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
                        },
                        REVIEW: {},
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
        const commentForm = {
            userId: 1,
            articleId: args.articleId,
            commentId: args.commentId,
            content: args.content,
            createdAt: now,
            updatedAt: now,
        };

        if (args.commentId) {
            const comment = await knex('comment').where('id', args.commentId).first();
            if (comment.commentId) {
                throw new ApolloError('Comment Depth Error', 'INTERNAL_SERVER_ERROR');
            }
        }

        if (context.req.headers.accesstoken) {
            const jwtToken = readAccessToken(context.req.headers.accesstoken);
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
};

export default articleMutations;
