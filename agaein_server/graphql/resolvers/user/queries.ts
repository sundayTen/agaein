import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { validateAuthorizationHeader } from '../../../common/validation/auth';

const userQueries = {
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id).first();
            return user;
        } catch {
            throw new ApolloError('[user] DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    me: async (_: any, args: any, context: any) => {
        const authorization = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);

        const jwtToken = readAccessToken(authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;

        try {
            const user = await knex('user').where('id', userId).first();
            return user;
        } catch {
            throw new ApolloError('[me] DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    profile: async (_: any, args: any, context: any) => {
        const authorization = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);

        const jwtToken = readAccessToken(authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;

        const profile: any = {};
        profile.user = await knex('user').where('id', userId).first();

        const lfps = await knex('lfp')
            .join('article', 'article.id', 'lfp.article_id')
            .join('breed', 'lfp.breed_id', 'breed.id')
            .where('article.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`);
        profile.lfps = lfps.map((article: any) => {
            const { atcId, articleType, ...detailData } = article;
            article.id = atcId;
            article.type = articleType;
            article.articleDetail = { articleType, ...detailData };
            return article;
        });

        const lfgs = await knex('lfg')
            .join('article', 'article.id', 'lfg.article_id')
            .join('breed', 'lfg.breed_id', 'breed.id')
            .where('article.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`);
        profile.lfgs = lfgs.map((article: any) => {
            const { atcId, articleType, ...detailData } = article;
            article.id = atcId;
            article.type = articleType;
            article.articleDetail = { articleType, ...detailData };
            return article;
        });

        const reviews = await knex('review')
            .join('article', 'article.id', 'review.article_id')
            .where('article.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`);
        profile.reviews = reviews.map((article: any) => {
            const { atcId, articleType, ...detailData } = article;
            article.id = atcId;
            article.type = articleType;
            article.articleDetail = { articleType, ...detailData };
            return article;
        });

        const reviewBookmarks = await knex('bookmark')
            .join('review', 'bookmark.article_id', 'review.article_id')
            .join('article', 'article.id', 'review.article_id')
            .where('bookmark.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`, `review.id as id`);;
        const lfpBookmarks = await knex('bookmark')
            .join('lfp', 'bookmark.article_id', 'lfp.article_id')
            .join('article', 'article.id', 'lfp.article_id')
            .join('breed', 'lfp.breed_id', 'breed.id')
            .where('bookmark.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`, `lfp.id as id`);;
        const lfgBookmarks = await knex('bookmark')
            .join('lfg', 'bookmark.article_id', 'lfg.article_id')
            .join('article', 'article.id', 'lfg.article_id')
            .join('breed', 'lfg.breed_id', 'breed.id')
            .where('bookmark.user_id', userId)
            .select('*', `article.type as articleType`, `article.id as atcId`, `lfg.id as id`);;
        const bookmarks: Array<any> = [].concat(lfpBookmarks, lfgBookmarks, reviewBookmarks);
        profile.bookmarks = bookmarks.map((article: any) => {
            const { atcId, articleType, ...detailData } = article;
            article.id = atcId;
            article.type = articleType;
            article.articleDetail = { articleType, ...detailData };
            return article;
        });

        profile.reports = await knex('report').where('user_id', userId);

        return profile;
    },
};

export default userQueries;
