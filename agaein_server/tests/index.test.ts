import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { resolvers, typeDefs } from '../graphql/schema';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

export const testServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: false,
    uploads: false,
});
var accessToken: string;

testServer
    .executeOperation({
        query: 'mutation login($kakaoId: String!, $pw: String!) { login(kakaoId: $kakaoId, pw: $pw) { accessToken } }',
        variables: { kakaoId: '1234567890', pw: process.env.LOGIN_PW },
    })
    .then((result) => {
        accessToken = result.data?.login.accessToken;
    });

export const getAccessToken = () => {
    let idx: number = 0;
    while (accessToken === undefined && idx < 20) {
        setTimeout(() => 1, 500);
        idx++;
    }

    return accessToken;
};

test('login test', async () => {
    const result = await testServer.executeOperation({
        query: 'mutation login($kakaoId: String!, $pw: String!) { login(kakaoId: $kakaoId, pw: $pw) { accessToken } }',
        variables: { kakaoId: '1234567890', pw: process.env.LOGIN_PW },
    });

    expect(result.data?.login.accessToken !== undefined).toBe(true);
});
