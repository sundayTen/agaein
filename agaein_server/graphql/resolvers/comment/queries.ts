import { knex } from '../../database';

const commentQueries = {
    Comments: async (_: any, args: any) => {
        if (args.boardType === 'LFP') {
            const comments = await knex('looking_for_pet_article_comment');
            return comments;
        }
        if (args.boardType === 'LFG') {
            const comments = await knex('looking_for_guardian_comment');
            return comments;
        }
    },
};

export default commentQueries;
