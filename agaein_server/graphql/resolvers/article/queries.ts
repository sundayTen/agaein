import { knex } from '../../database';

const articleQueries = {
    Articles: async (_: any, args: any) => {
        // ? 여기선 Enum으로 정의된 Constant를 사용 못하나?
        if (args.boardType === 'LFP') {
            const articles = await knex('looking_for_pet_article');
            return articles;
        }
        if (args.boardType === 'LFG') {
            const articles = await knex('looking_for_guardian_article');
            return articles;
        }
    },
    Article: async (_: any, args: any) => {
        try {
            if (args.boardType === 'LFP') {
                const article = await knex('looking_for_pet_article').where('id', args.id).first();
                return article;
            }
            if (args.boardType === 'LFG') {
                const article = await knex('looking_for_guardian_article').where('id', args.id).first();
                return article;
            }
        } catch {
            console.error();
        }
    },
};

export default articleQueries;
