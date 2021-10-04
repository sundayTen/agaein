import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        // @TODO 위치 맨 뒤로 바꾸기 현재는 하나의 이미지만 가능
        const { createReadStream, filename } = await args.file;

        const stream = createReadStream();

        const out = require('fs').createWriteStream(filename);
        await stream.pipe(out);
        await stream.on('close', () => {
            console.log(`store ${filename}`);
        });

        const now = new Date();
        const articleForm = {
            // 임시로 18 넣음
            user_id: 18,
            title: args.title,
            content: args.content,
            created_at: now,
            updated_at: now,
        };

        const article: any = {
            // 유저 데이터 넣어야 함.
            user: {},
            title: args.title,
            content: args.content,
            comments: [],
            created_at: now,
            updated_at: now,
        };

        try {
            const articles = await knex('article').insert(articleForm).returning('*');
            article.id = articles[0].id;
        } catch {
            console.error('createArticle - article에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }

        const articleDetailForm: any = {
            LFG: {
                article_id: article.id,
                breed_id: args.breedId,
                name: args.name,
                feature: args.feature,
                gender: args.gender,
                location: args.location,
                foundDate: args.foundDate,
            },
            LFP: {
                article_id: article.id,
                breed_id: args.breedId,
                name: args.name,
                feature: args.feature,
                gender: args.gender,
                location: args.location,
                lostDate: args.lostDate,
                gratuity: args.gratuity,
            },
            REVIEW: {},
        };

        // @TODO validation 확인해야 됨.

        try {
            const articleDetail = await knex(args.boardType).insert(articleDetailForm[args.boardType]).returning('*');
            articleDetailForm[args.boardType].id = articleDetail[0].id;
        } catch {
            console.error('createArticle - Detail에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }

        article.articleDetail = articleDetailForm[args.boardType];

        return article;
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
