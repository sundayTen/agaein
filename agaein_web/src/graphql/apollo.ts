import Cookies from 'universal-cookie';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cookies = new Cookies();
const httpLink = createHttpLink({
    uri: 'http://localhost:3005/graphql',
});
const authLink = setContext((_, { headers }) => {
    const token = cookies.get('token');
    console.log('🚀 ~ file: apollo.ts ~ line 11 ~ authLink ~ token', token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
