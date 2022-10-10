import { ApolloError } from 'apollo-server-express';
import { ID, PagingArticleDetail } from '../../customTypes';
import { Article_Order, QueryArticleArgs, QueryArticleLengthArgs, QueryArticlesArgs } from '../../types';
import { mappingArticles, getArticleLength, getArticleWithDetailById, getPagingArticleDetails, getArticleById } from './queryServices';

const DEFAULT_PAGE_LIMIT: number = 6;
const DEFAULT_PAGE_OFFSET: number = 0;

const articleQueries = {
    articles: async (_: any, articlesRequest: QueryArticlesArgs) => {
        const { boardType, search } = articlesRequest;
        const order: Article_Order = articlesRequest.order != null ? articlesRequest.order : Article_Order.New;
        const limit: number = articlesRequest.limit != null ? articlesRequest.limit : DEFAULT_PAGE_LIMIT;
        const offset: number = articlesRequest.offset != null ? articlesRequest.offset : DEFAULT_PAGE_OFFSET;

        if (offset % limit != 0) {
            throw new ApolloError('Offset must be Multiple of Limit', 'BAD_USER_INPUT');
        }

        const articleDetails: PagingArticleDetail = await getPagingArticleDetails(
            boardType,
            search,
            order,
            limit,
            offset,
        );

        if (articleDetails.totalPage < articleDetails.currentPage) {
            throw new ApolloError('Current Page is Bigger than Total Page', 'BAD_USER_INPUT');
        }

        return await mappingArticles(boardType, articleDetails);
    },
    articleLength: async (_: any, articleLengthRequest: QueryArticleLengthArgs) =>
        getArticleLength(articleLengthRequest.boardType),
    article: async (_: any, articleRequest: QueryArticleArgs) => {
        const id: ID = articleRequest.id;
        if ((await getArticleById(id)) !== undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT')
        }

        return await getArticleWithDetailById(id);
    },
};

export default articleQueries;
