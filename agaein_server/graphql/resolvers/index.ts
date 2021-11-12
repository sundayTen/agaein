import { GraphQLUpload } from 'graphql-upload';
import { articleQueries, articleMutations } from './article';
import { breedQueries, breedMutations } from './breed';
import { reportQueries, reportMutations } from './report';
import { userQueries, userMutations } from './user';
import { knex } from '../database';

const resolvers = {
    Query: {
        ...userQueries,
        ...articleQueries,
        ...breedQueries,
        ...reportQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
        ...breedMutations,
        ...reportMutations,
    },
    Upload: GraphQLUpload,
    ArticleDetail: {
        __resolveType(parent: any) {
            return parent.articleType;
        },
    },
    Comment: {
        async author(parent: any) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
    },
    Article: {
        async author(parent: any) {
            return await knex('user').where('id', `${parent.userId}`).first();
        },
        async comments(parent: any) {
            return await knex('comment').where('articleId', `${parent.id}`);
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
    },
};

export default resolvers;
