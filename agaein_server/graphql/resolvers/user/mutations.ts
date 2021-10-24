import { ApolloError } from 'apollo-server-errors';
import { isValidatedLogin } from '../../../common/validation/user';
import { getAccessToken, getRefreshToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const userMutations = {
    login: async (_: any, args: any, context: any) => {
        console.log('🚀 ~ file: mutations.ts ~ line 8 ~ login: ~ context', context.req.headers);
        // TODO : getToken 함수로 조건문 캡술화
        if (context.req.headers.authorization.split(' ')[1] === undefined) {
            throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
        }

        if (!isValidatedLogin(args.kakaoId)) {
            throw new ApolloError('isNotValidated', 'BAD_USER_INPUT');
        }

        let user = await knex('user').where('kakao_id', args.kakaoId).first();
        if (user === undefined) {
            const now = new Date();
            const userForm = {
                kakao_id: args.kakaoId,
                created_at: now,
                updated_at: now,
            };

            user = await knex('user').insert(userForm).returning('*');
            user = user[0];
        }

        context.res.cookie('accessToken', getAccessToken(user.id, user.kakaoId), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        context.res.cookie('refreshToken', getRefreshToken(user.id, user.kakaoId), {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return user;
    },
};

export default userMutations;
