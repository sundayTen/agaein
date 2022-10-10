import { GraphQLUpload } from 'graphql-upload';
import {
    ArticleWithUserId,
    CommentWithUserId,
    ProfileReportWithUserId,
    ReportWithUserId,
    Upload,
} from '../customTypes';
import { knex } from '../database';
import { User } from '../types';
import { articleMutations, articleQueries } from './article';
import { bookmarkMutations, bookmarkQueries } from './bookmark';
import { breedMutations, breedQueries } from './breed';
import { contactMutations } from './contact';
import { crawlingMutations, crawlingQueries } from './crawling';
import { reportMutations, reportQueries } from './report';
import { userMutations, userQueries } from './user';

const resolvers = {
    Query: {
        ...userQueries,
        ...articleQueries,
        ...breedQueries,
        ...reportQueries,
        ...bookmarkQueries,
        ...crawlingQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
        ...breedMutations,
        ...reportMutations,
        ...bookmarkMutations,
        ...crawlingMutations,
        ...contactMutations,
    },
    Upload: GraphQLUpload,
    ArticleDetail: {
        __resolveType(parent: any) {
            return parent.articleType;
        },
    },
    User: {
        async profileUrl(parent: User) {
            const user = await knex('image').where(`user_id`, parent.id).orderBy('id', 'desc').first();
            return user ? user.url : null;
        },
    },
    Comment: {
        async author(parent: CommentWithUserId) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
        async reply(parent: CommentWithUserId) {
            return (await knex('comment').where('commentId', `${parent.id}`)) ?? [];
        },
    },
    Article: {
        async author(parent: ArticleWithUserId) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
        async comments(parent: ArticleWithUserId) {
            return await knex('comment').where('articleId', `${parent.id}`).whereNull('commentId');
        },
        async images(parent: ArticleWithUserId) {
            const rawImages: Array<Upload> = await knex('image').where(`article_id`, parent.id);
            const images: Array<string> = rawImages.map((image: any) => {
                return image.url;
            });

            return images || [];
        },
    },
    Report: {
        async images(parent: ReportWithUserId) {
            const rawImages: Array<Upload> = await knex('image').where('report_id', parent.id);
            const images: Array<string> = rawImages.map((image: any) => {
                return image.url;
            });

            return images || [];
        },
        async author(parent: ReportWithUserId) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
    },
    ProfileReport: {
        async images(parent: ProfileReportWithUserId) {
            const rawImages: Array<Upload> = await knex('image').where('report_id', parent.id);
            const images: Array<string> = rawImages.map((image: Upload) => {
                return image.url;
            });

            return images || [];
        },
        async author(parent: ProfileReportWithUserId) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
    },
};

export default resolvers;
