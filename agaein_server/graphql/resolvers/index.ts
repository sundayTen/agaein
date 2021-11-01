import { GraphQLUpload } from 'graphql-upload';
import { userQueries, userMutations } from './user';
import { breedQueries, breedMutations } from './breed';
import { articleQueries, articleMutations } from './article';

const resolvers = {
    Upload: GraphQLUpload,
    ArticleDetail: {
        __resolveType(obj: any) {
            return obj.articleType;
        },
    },
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
};

export default resolvers;
