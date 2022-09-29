import { ID } from '../../customTypes';
import { Article_Order, QueryArticleArgs, QueryArticleLengthArgs, QueryArticlesArgs } from '../../types';
import { distinctArticles, getArticleWithDetailById, getArticleLength, getPagingArticleDetails } from './queryServices';

const DEFAULT_PAGE_LIMIT: number = 6;
const DEFAULT_PAGE_OFFSET: number = 0;

const articleQueries = {
    articles: async (_: any, articlesRequest: QueryArticlesArgs) => {
        const { boardType, search } = articlesRequest;
        const order: Article_Order = articlesRequest.order != null ? articlesRequest.order : Article_Order.New;
        const limit: number = articlesRequest.limit != null ? articlesRequest.limit : DEFAULT_PAGE_LIMIT;
        const offset: number = articlesRequest.offset != null ? articlesRequest.offset : DEFAULT_PAGE_OFFSET;

        const articleDetails: Array<any> = await getPagingArticleDetails(boardType, search, order, limit, offset);

        return distinctArticles(boardType, articleDetails);
    },
    articleLength: async (_: any, articleLengthRequest: QueryArticleLengthArgs) =>
        getArticleLength(articleLengthRequest.boardType),
    article: async (_: any, articleRequest: QueryArticleArgs) => {
        const id: ID = articleRequest.id;

        return await getArticleWithDetailById(id);
    },
};

export default articleQueries;
