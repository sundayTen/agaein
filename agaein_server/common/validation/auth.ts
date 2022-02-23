import { ApolloError } from 'apollo-server-errors';

export function validateAuthorizationHeader(authorization: any) {
    if (authorization === undefined) {
        throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
    }

    const splitedAuthorization = authorization.split(' ');

    if (splitedAuthorization[0] !== 'Bearer' || splitedAuthorization.length < 1) {
        throw new ApolloError('Invalid Authorization Header', 'UNAUTHENTICATED');
    }
}
