import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const commentMutations = {
    createComment: async (_: any, args: any, context: any) => {
        const now = new Date();
        const info = {
            // 임시로 18 넣음
            user_id: 18,
            article_id: args.articleId,
            info: JSON.stringify(args.Comment),
            created_at: now,
            updated_at: now,
        };

        try {
            if (args.boardType === 'LFP') {
                const comments = await knex('looking_for_pet_article_comment').insert(info).returning('*');
                const comment = comments[0];
                return comment;
            }
            if (args.boardType === 'LFG') {
                const comments = await knex('looking_for_guardian_article_comment').insert(info).returning('*');
                const comment = comments[0];
                return comment;
            }
        } catch {
            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default commentMutations;
