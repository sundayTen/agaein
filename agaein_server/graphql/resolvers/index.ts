import { GraphQLUpload } from 'graphql-upload';
import { userQueries, userMutations } from './user';
import { breedQueries, breedMutations } from './breed';
import { bookmarkQueries, bookmarkMutations } from './bookmark';
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
        ...bookmarkQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
        ...breedMutations,
        ...bookmarkMutations,
    },
};

export default resolvers;
