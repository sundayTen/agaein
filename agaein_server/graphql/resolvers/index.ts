import { GraphQLUpload } from 'graphql-upload';
import { userQueries, userMutations } from './user';
import { articleQueries, articleMutations } from './article';
import { commentQueries, commentMutations } from './comment';

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        ...userQueries,
        ...articleQueries,
        ...commentQueries,
    },
    Mutation: {
        ...userMutations,
        ...articleMutations,
        ...commentMutations,
    },
};

export default resolvers;
