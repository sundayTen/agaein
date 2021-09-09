import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: false,
});

export default apolloServer;
