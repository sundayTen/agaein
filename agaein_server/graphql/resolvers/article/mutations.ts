import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        const { boardType, title, content, articleDetail } = args;
        const { breedId, name, feature, gender, location, foundDate, lostDate, gratuity } = articleDetail;

        // @TODO validation 확인해야 됨.

        const now = new Date();
        const articleForm = {
            // 임시로 1 넣음
            userId: 1,
            title,
            content,
            createdAt: now,
            updatedAt: now,
        };

        const article: any = {
            // 유저 데이터 넣어야 함.
            user: {},
            title,
            content,
            comments: [],
            images: [],
            createdAt: now,
            updatedAt: now,
        };

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

                    console.log(boardType);

                    return knex(boardType)
                        .transacting(trx)
                        .insert(articleDetailForm[boardType])
                        .returning('id')
                        .then((articleDetailId: any) => {
                            articleDetailForm[boardType].id = articleDetailId[0];
                            article.articleDetail = articleDetailForm[boardType];
                            console.log('check');

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
    createComment: async (_: any, args: any) => {
        const now = new Date();
        const commentForm = {
            // 임시로 18 넣음
            user_id: 18,
            article_id: args.articleId,
            content: args.content,
            created_at: now,
            updated_at: now,
        };

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
    createNestedComment: async (_: any, args: any) => {
        const now = new Date();
        const commentForm = {
            // 임시로 18 넣음
            user_id: 18,
            comment_id: args.commentId,
            content: args.content,
            created_at: now,
            updated_at: now,
        };

        try {
            const comments = await knex('nested_comment').insert(commentForm).returning('*');
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
