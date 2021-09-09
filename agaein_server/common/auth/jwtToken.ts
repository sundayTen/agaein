import { jwtSecretKey } from '../../config/environment';
import jwt from 'jsonwebtoken';

export function getAccessToken(user_id: number, email: string) {
    return jwt.sign(
        {
            id: user_id,
            email: email,
        },
        jwtSecretKey,
        {
            algorithm: 'HS256',
            expiresIn: '1d',
        },
    );
}

export function getRefreshToken(user_id: number, email: string) {
    return jwt.sign(
        {
            id: user_id,
            email: email,
        },
        jwtSecretKey,
        {
            algorithm: 'HS256',
            expiresIn: '30d',
        },
    );
}
