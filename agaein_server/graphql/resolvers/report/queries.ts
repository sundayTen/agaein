import { knex } from '../../database';

const reportQueries = {
    reports: async (_: any, args: any) => knex('report').where('article_id', args.articleId),
};

export default reportQueries;
