import { ID } from '../../customTypes';
import { knex } from '../../database';
import { Article_Order, Board_Type, Finding_Status, Maybe } from '../../types';
import { getBreedById } from '../breed/services';

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

export async function getArticleByIdAndUserId(articleId: ID, userId: ID) {
    return await knex('article').where({ id: articleId, user_id: userId }).first();
}

export async function getPagingArticleDetails(
    boardType: Board_Type,
    search: Maybe<string> | undefined,
    order: Article_Order,
    limit: number,
    offset: number,
) {
    return search != null
        ? boardType === Board_Type.Review
            ? await getPagingReviewsWithSearch(search, order, limit, offset)
            : await getPagingLfpgsWithSearch(boardType, search, order, limit, offset)
        : boardType === Board_Type.Review
        ? await getPagingReviews(order, limit, offset)
        : await getPagingLfpgs(boardType, order, limit, offset);
}

async function getPagingReviewsWithSearch(search: string, order: Article_Order, limit: number, offset: number) {
    return await knex('review')
        .join('article', 'article.id', 'review.article_id')
        .where(`review.content`, 'like', `%${search}%`)
        .orWhere(`review.title`, 'like', `%${search}%`)
        .orderBy(order === Article_Order.View ? 'view' : 'created_at', order === Article_Order.Old ? 'asc' : 'desc')
        .limit(limit)
        .offset(offset);
}

async function getPagingReviews(order: Article_Order, limit: number, offset: number) {
    return await knex('review')
        .join('article', 'article.id', 'review.article_id')
        .orderBy(order === Article_Order.View ? 'view' : 'created_at', order === Article_Order.Old ? 'asc' : 'desc')
        .limit(limit)
        .offset(offset);
}

async function getPagingLfpgsWithSearch(
    boardType: Board_Type,
    search: string,
    order: Article_Order,
    limit: number,
    offset: number,
) {
    return await knex(`${boardType}`)
        .join('article', 'article.id', `${boardType}.article_id`)
        .join('breed', `${boardType}.breed_id`, 'breed.id')
        .join('article_keyword', 'article.id', 'article_keyword.article_id')
        .join('keyword', 'article_keyword.keyword_id', 'keyword.id')
        .where(`${boardType}.name`, search)
        .orWhere(`${boardType}.feature`, 'like', `%${search}%`)
        .orWhere(
            'breed.type',
            search === '강아지' || search === '개' ? 'DOG' : search === '고양이' || search === '냥이' ? 'CAT' : 'X',
        )
        .orWhere('breed.breed', search)
        .orWhere('keyword.keyword', search)
        .select('*', `${boardType}.id as id`)
        .orderBy(order === Article_Order.View ? 'view' : 'created_at', order === Article_Order.Old ? 'asc' : 'desc')
        .limit(limit)
        .offset(offset);
}

async function getPagingLfpgs(boardType: Board_Type, order: Article_Order, limit: number, offset: number) {
    return await knex(`${boardType}`)
        .join('article', 'article.id', `${boardType}.article_id`)
        .join('breed', `${boardType}.breed_id`, 'breed.id')
        .join('article_keyword', 'article.id', 'article_keyword.article_id')
        .join('keyword', 'article_keyword.keyword_id', 'keyword.id')
        .select('*', `${boardType}.id as id`)
        .orderBy(order === Article_Order.View ? 'view' : 'created_at', order === Article_Order.Old ? 'asc' : 'desc')
        .limit(limit)
        .offset(offset);
}

export async function distinctArticles(boardType: Board_Type, articleDetails: Array<any>) {
    const distinct: any = {};
    const articles = articleDetails.reduce((res: any, detail: any) => {
        const { articleId, ...detailData } = detail;

        if (distinct[detail.articleId] === undefined) {
            distinct[detail.articleId] = true;
            detail.id = articleId;
            detail.articleDetail = { articleType: boardType, articleId, ...detailData };
            detail.articleDetail.keyword = null;
            res.push(detail);
        }

        return res;
    }, []);

    return articles;
}

export async function getArticleLength(boardType: Board_Type) {
    return (await knex(`${boardType}`).count('*').first()).count;
}

export async function getArticleWithDetailById(id: ID) {
    const article = await knex('article').where(`id`, id).first();
    const articleDetail = await knex(article.type).where('articleId', `${id}`).first();
    articleDetail.articleType = article.type;

    if (article.type !== 'REVIEW') {
        const breedObj = await getBreedById(articleDetail.breedId);
        const { breed, type } = breedObj;
        articleDetail.breed = breed;
        articleDetail.type = type;
        articleDetail.keyword = await getKeywordByArticleId(id);
    }

    article.articleDetail = articleDetail;
    increaseViewCount(article);

    return article;
}

async function getKeywordByArticleId(id: ID) {
    const keywordObj: any = await knex('article_keyword')
        .join('keyword', 'keyword.id', 'article_keyword.keyword_id')
        .where('article_id', id);

    return keywordObj.map((keyword: any) => keyword.keyword);
}

async function increaseViewCount(article: any) {
    await knex('article')
        .where('id', article.id)
        .update({
            view: article.view + 1,
        });
}

export async function getArticleById(id: ID) {
    return await knex('article').where(`id`, id).first();
}
