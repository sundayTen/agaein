import Cookies from 'universal-cookie';
import { ApolloClient, createHttpLink, InMemoryCache, from, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const cookies = new Cookies();
const httpLink = createHttpLink({
    // uri: 'https://www.agaein.com/graphql',
    uri: 'http://localhost:3005/graphql',
});
const authLink = setContext((_, { headers }) => {
    const token = cookies.get('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});
// TODO : Error 핸들링은 여기서 함 (1. 콘솔 말고 기능 정의, 2. 에러 타입 정립)
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    name: 'agaein',
    version: '0.0.1',
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache({
        addTypename: true, // __typename 필드를 자동으로 붙혀주는지 여부 - default : true. false로 바꾸면
        resultCaching: true,
    }),
});
