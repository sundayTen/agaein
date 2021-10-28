import { ApolloError } from 'apollo-server-errors';
import { jwtSecretKey } from '../../config/environment';
import jwt from 'jsonwebtoken';

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

export function readAccessToken(token: string) {
    const jwtToken = jwt.verify(token, jwtSecretKey);

    const now = +new Date();
    if (now / 1000 > (<any>jwtToken).exp) {
        throw new ApolloError('Token is Expired', 'UNAUTHENTICATED');
    }

    return jwtToken;
}
