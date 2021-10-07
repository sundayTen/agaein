import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        const { boardType, title, content, articleDetail } = args;
        const { breedId, name, feature, gender, location, foundDate, lostDate, gratuity } = articleDetail;

        // @TODO validation 확인해야 됨.

        const now = new Date();
        const articleForm = {
            // 임시로 18 넣음
            userId: 18,
            title: title,
            content: content,
            createdAt: now,
            updatedAt: now,
        };

        const article: any = {
            // 유저 데이터 넣어야 함.
            user: {},
            title: title,
            content: content,
            comments: [],
            createdAt: now,
            updatedAt: now,
        };

        // @TODO 위치 맨 뒤로 바꾸기 현재는 하나의 이미지만 가능
        // const { createReadStream, filename } = await args.file;

        // const stream = createReadStream();

        // const out = require('fs').createWriteStream(filename);
        // await stream.pipe(out);
        // await stream.on('close', () => {
        //     console.log(`store ${filename}`);
        // });

        return await knex.transaction((trx: any) => {
            return knex('article')
                .transacting(trx)
                .insert(articleForm)
                .returning('id')
                .then((articleId: any) => {
                    article.id = articleId[0];
                    const articleDetailForm: any = {
                        LFG: {
                            articleId: article.id,
                            breedId: breedId,
                            name: name,
                            feature: feature,
                            gender: gender,
                            location: location,
                            foundDate: foundDate,
                        },
                        LFP: {
                            articleId: article.id,
                            breedId: breedId,
                            name: name,
                            feature: feature,
                            gender: gender,
                            location: location,
                            lostDate: lostDate,
                            gratuity: gratuity,
                        },
                        REVIEW: {},
                    };
                    return knex(boardType).transacting(trx).insert(articleDetailForm[boardType]).returning('id').then((articleDetailId: any) => {
                        articleDetailForm[boardType].id = articleDetailId[0];
                        article.articleDetail = articleDetailForm[boardType];
                    })
                }).then(() => {
                    return article;
                }).catch(() => {
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
