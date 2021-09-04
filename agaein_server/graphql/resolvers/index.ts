import { userQueries, userMutations } from './user';

const resolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...userMutations,
    },
};

export default resolvers;
