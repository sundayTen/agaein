import { GraphQLUpload } from 'graphql-upload';
import { userQueries, userMutations } from './user';
import { articleQueries, articleMutations } from './article';

const resolvers = {
    Upload: GraphQLUpload,
    ArticleDetail: {
        __resolveType(_: any, args: any) {
            if (args.gratuity) {
                return 'LFP';
            }
            return 'LFG';
        },
    },
    Query: {
        ...userQueries,
        ...articleQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
    },
};

export default resolvers;
