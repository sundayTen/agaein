import Cookies from 'universal-cookie';
import { ApolloClient, createHttpLink, InMemoryCache, from, NormalizedCacheObject, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { convertAnimalType, convertGender } from 'utils/converter';

// TODO : context를 통해 쿠키를 가져오고 싶은데, Hook Rule에 걸림. 방법이 없을까?
const cookies = new Cookies();
const httpLink = createHttpLink({
    uri: 'https://www.agaein.com/graphql',
});
const uploadLink = createUploadLink({
    uri: 'https://www.agaein.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    const accessToken = cookies.get('accessToken') ?? '';
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`,
        },
    };
});
// TODO : Error 핸들링은 여기서 함 (1. 콘솔 말고 기능 정의, 2. 에러 타입 정립)
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    name: 'agaein',
    version: '0.0.1',
    link: from([authLink, errorLink, uploadLink as unknown as ApolloLink, httpLink]),
    cache: new InMemoryCache({
        addTypename: true,
        resultCaching: true,
        typePolicies: {
            LFG: {
                fields: {
                    gender: {
                        read(gender) {
                            return convertGender(gender);
                        },
                    },
                    type: {
                        read(type) {
                            return convertAnimalType(type);
                        },
                    },
                },
            },
            LFP: {
                fields: {
                    gender: {
                        read(gender) {
                            return convertGender(gender);
                        },
                    },
                    type: {
                        read(type) {
                            return convertAnimalType(type);
                        },
                    },
                },
            },
        },
    }),
});
