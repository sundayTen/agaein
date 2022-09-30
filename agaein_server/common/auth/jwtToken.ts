import { ApolloError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../../config/environment';
import { JwtPayload } from '../../graphql/customTypes';
import { validateAuthorizationHeader } from '../validation/auth';

export function getAccessToken(userId: number, kakaoId: string) {
    return jwt.sign(
        {
            userId: userId,
            kakaoId: kakaoId,
        },
        jwtSecretKey,
        {
            algorithm: 'HS256',
            expiresIn: '7d',
        },
    );
}

export function getRefreshToken(userId: number, kakaoId: string) {
    return jwt.sign(
        {
            userId: userId,
            kakaoId: kakaoId,
        },
        jwtSecretKey,
        {
            algorithm: 'HS256',
            expiresIn: '28d',
        },
    );
}

export function readAccessToken(authorization: string) {
    const jwtToken = <JwtPayload>jwt.verify(authorization.split(' ')[1], jwtSecretKey);

    const now = +new Date();
    if (now / 1000 > jwtToken.exp) {
        throw new ApolloError('Token is Expired', 'UNAUTHENTICATED');
    }

    return jwtToken;
}

export function getUserId(authorization: string) {
    validateAuthorizationHeader(authorization);

    return readAccessToken(authorization).userId;
}
