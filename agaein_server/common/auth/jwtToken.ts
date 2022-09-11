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

// @TODO 외부 함수에서 사용하지 않을 때, token -> authorization 전체로 받아서 파싱하는 것으로 변경. 이름도 get payload로
export function readAccessToken(token: string) {
    const jwtToken = <JwtPayload>jwt.verify(token, jwtSecretKey);

    const now = +new Date();
    if (now / 1000 > jwtToken.exp) {
        throw new ApolloError('Token is Expired', 'UNAUTHENTICATED');
    }

    return jwtToken;
}

export function getUserId(authorization: string) {
    validateAuthorizationHeader(authorization);
    
    const token: string = authorization.split(' ')[1];

    return readAccessToken(token).userId;
}