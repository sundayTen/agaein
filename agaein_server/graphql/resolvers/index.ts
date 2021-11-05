import { GraphQLUpload } from 'graphql-upload';
import { userQueries, userMutations } from './user';
import { breedQueries, breedMutations } from './breed';
import { articleQueries, articleMutations } from './article';
import { knex } from '../database';

const resolvers = {
    Query: {
        ...userQueries,
        ...articleQueries,
        ...breedQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
        ...breedMutations,
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
            const articleType = parent.articleDetail.articleType;
            const rawImages = await knex(articleType).join('image', `${articleType}.article_id`, 'image.article_id');
            const images: any = {};
            rawImages.forEach((rawImage: any) => {
                if (images[rawImage.articleId]) {
                    images[rawImage.articleId].push(rawImage.url);
                } else {
                    images[rawImage.articleId] = [rawImage.url];
                }
            });

            return images[parent.id] || [];
        },
    },
};

export default resolvers;
