import { GraphQLUpload } from 'graphql-upload';
import { knex } from '../database';
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
        async profileUrl(parent: any) {
            const user = await knex('image').where(`user_id`, parent.id).orderBy('id', 'desc').first();
            return user ? user.url : null;
        },
    },
    Comment: {
        async author(parent: any) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
        async reply(parent: any) {
            return (await knex('comment').where('commentId', `${parent.id}`)) ?? [];
        },
    },
    Article: {
        async author(parent: any) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
        async comments(parent: any) {
            return await knex('comment').where('articleId', `${parent.id}`).whereNull('commentId');
        },
        async images(parent: any) {
            const rawImages = await knex('image').where(`article_id`, parent.id);
            const images = rawImages.map((image: any) => {
                return image.url;
            });

            return images || [];
        },
    },
    Report: {
        async images(parent: any) {
            const rawImages = await knex('image').where('report_id', parent.id);
            const images = rawImages.map((image: any) => {
                return image.url;
            });

            return images || [];
        },
        async author(parent: any) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
    },
};

export default resolvers;
