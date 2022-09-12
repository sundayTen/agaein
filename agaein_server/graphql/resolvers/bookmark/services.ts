import { ID } from '../../customTypes';
import { knex } from '../../database';

export async function getBookmarksByUserId(userId: ID) {
    const reviewBookmarks: Array<any> = await knex('bookmark')
        .join('review', 'bookmark.article_id', 'review.article_id')
        .join('article', 'article.id', 'review.article_id')
        .where('bookmark.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`, `review.id as id`);
    const lfpBookmarks: Array<any> = await knex('bookmark')
        .join('lfp', 'bookmark.article_id', 'lfp.article_id')
        .join('article', 'article.id', 'lfp.article_id')
        .join('breed', 'lfp.breed_id', 'breed.id')
        .where('bookmark.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`, `lfp.id as id`);
    const lfgBookmarks: Array<any> = await knex('bookmark')
        .join('lfg', 'bookmark.article_id', 'lfg.article_id')
        .join('article', 'article.id', 'lfg.article_id')
        .join('breed', 'lfg.breed_id', 'breed.id')
        .where('bookmark.user_id', userId)
        .select('*', `article.type as articleType`, `article.id as atcId`, `lfg.id as id`);

    const bookmarks: Array<any> = [];
    return bookmarks.concat(lfpBookmarks, lfgBookmarks, reviewBookmarks).map((article: any) => {
        const { atcId, articleType, ...detailData } = article;
        article.id = atcId;
        article.type = articleType;
        article.articleDetail = { articleType, ...detailData };
        return article;
    });
}
