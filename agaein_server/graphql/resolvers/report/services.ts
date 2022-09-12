import { ID } from '../../customTypes';
import { knex } from '../../database';

export async function getReportsByUserId(userId: ID) {
    return await knex('report').where('user_id', userId);
}

export async function getReportsByArticleId(articleId: ID) {
    return await knex('report').where('article_id', articleId);
}

