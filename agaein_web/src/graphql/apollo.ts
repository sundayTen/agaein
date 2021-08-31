import { SERVER_URL } from '../config/server';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: SERVER_URL,
    cache: new InMemoryCache(),
});
