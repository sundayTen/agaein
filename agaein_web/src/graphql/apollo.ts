import Cookies from 'universal-cookie';
import { ApolloClient, createHttpLink, InMemoryCache, from, NormalizedCacheObject, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { convertAge, convertAnimalType, convertGender, convertGratuity, convertStatus } from 'utils/converter';

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
    version: '1.0.0',
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
                    age: {
                        read(age) {
                            return convertAge(age);
                        },
                    },
                    status: {
                        read(status) {
                            return convertStatus(status);
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
                    age: {
                        read(age) {
                            return convertAge(age);
                        },
                    },
                    gratuity: {
                        read(gratuity) {
                            return convertGratuity(gratuity);
                        },
                    },
                    status: {
                        read(status) {
                            return convertStatus(status);
                        },
                    },
                },
            },
        },
    }),
});
