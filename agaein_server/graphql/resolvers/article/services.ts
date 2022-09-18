import { ID } from '../../customTypes';
import { knex } from '../../database';
import { Finding_Status } from '../../types';

export async function getLfpsByUserId(userId: ID) {
    const lfps: Array<any> = await knex('lfp')
        .join('article', 'article.id', 'lfp.article_id')
        .join('breed', 'lfp.breed_id', 'breed.id')
        .where('article.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`);

    return lfps.map((article: any) => {
        const { atcId, articleType, ...detailData } = article;
        article.id = atcId;
        article.type = articleType;
        article.articleDetail = { articleType, ...detailData };
        return article;
    });
}

export async function getLfgsByUserId(userId: ID) {
    const lfgs: Array<any> = await knex('lfg')
        .join('article', 'article.id', 'lfg.article_id')
        .join('breed', 'lfg.breed_id', 'breed.id')
        .where('article.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`);

    return lfgs.map((article: any) => {
        const { atcId, articleType, ...detailData } = article;
        article.id = atcId;
        article.type = articleType;
        article.articleDetail = { articleType, ...detailData };
        return article;
    });
}

export async function getReviewsByUserId(userId: ID) {
    const reviews: Array<any> = await knex('review')
        .join('article', 'article.id', 'review.article_id')
        .where('article.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`);

    return reviews.map((article: any) => {
        const { atcId, articleType, ...detailData } = article;
        article.id = atcId;
        article.type = articleType;
        article.articleDetail = { articleType, ...detailData };
        return article;
    });
}

export async function getCommentsByUserId(userId: ID) {
    return await knex('comment').where('user_id', userId);
}

export async function done(articleType: string, articleId: ID) {
    await knex(articleType)
        .update({
            status: Finding_Status.Done,
        })
        .where('article_id', articleId);
}

export async function getArticleByIdAndUserId(articleId: ID, userId: ID) {
    return await knex('article').where({ id: articleId, user_id: userId }).first();
}
