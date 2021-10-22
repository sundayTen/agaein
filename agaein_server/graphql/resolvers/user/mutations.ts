import { ApolloError } from 'apollo-server-errors';
import { isValidatedLogin } from '../../../common/validation/user';
import { getAccessToken, getRefreshToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const userMutations = {
    login: async (_: any, args: any, context: any) => {
        if (context.req.headers.accesstoken === undefined) {
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
            user = user[0]
        }

        context.res.cookie('accessToken', getAccessToken(user.id, user.email), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        context.res.cookie('refreshToken', getRefreshToken(user.id, user.email), {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return user;
    },
};

export default userMutations;
