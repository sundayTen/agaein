import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';

const userQueries = {
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id).first();
            return user;
        } catch {
            console.error('user에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    me: async (_: any, args: any, context: any) => {
        if (context.req.headers.authorization === undefined) {
            throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
        }
        const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;
        try {
            const user = await knex('user').where('id', userId).first();
            return user;
        } catch {
            console.error('me에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    profile: async (_: any, args: any, context: any) => {
        let userId;
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            userId = (<any>jwtToken).userId;
        }

        const profile: any = {};

        profile.user = await knex('user').where('id', userId).first();

        const lfps = await knex('lfp').join('article', 'article.id', 'lfp.article_id').where('article.user_id', userId);

        profile.lfps = lfps.map((detail: any) => {
            const { articleId, ...detailData } = detail;
            detail.id = articleId;
            detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
            return detail;
        });

        const lfgs = await knex('lfg').join('article', 'article.id', 'lfg.article_id').where('article.user_id', userId);

        profile.lfgs = lfgs.map((detail: any) => {
            const { articleId, ...detailData } = detail;
            detail.id = articleId;
            detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
            return detail;
        });

        const reviews = await knex('review')
            .join('article', 'article.id', 'review.article_id')
            .where('article.user_id', userId);

        profile.reviews = reviews.map((detail: any) => {
            const { articleId, ...detailData } = detail;
            detail.id = articleId;
            detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
            return detail;
        });

        const reviewBookmarks = await knex('bookmark')
            .join('review', 'bookmark.article_id', 'review.article_id')
            .join('article', 'article.id', 'review.article_id')
            .where('article.user_id', userId);
        const lfpBookmarks = await knex('bookmark')
            .join('lfp', 'bookmark.article_id', 'lfp.article_id')
            .join('article', 'article.id', 'lfp.article_id')
            .where('article.user_id', userId);
        const lfgBookmarks = await knex('bookmark')
            .join('lfg', 'bookmark.article_id', 'lfg.article_id')
            .join('article', 'article.id', 'lfg.article_id')
            .where('article.user_id', userId);
        const bookmarks: Array<any> = [].concat(lfpBookmarks, lfgBookmarks, reviewBookmarks);

        profile.bookmarks = bookmarks.map((detail: any) => {
            const { articleId, ...detailData } = detail;
            detail.id = articleId;
            detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
            return detail;
        });

        profile.reports = await knex('report').where('user_id', userId);

        return profile;
    },
};

export default userQueries;
