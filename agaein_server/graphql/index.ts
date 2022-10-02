import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers as any,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: false,
    uploads: false,
});

export default apolloServer;
