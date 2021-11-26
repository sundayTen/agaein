import { ApolloError } from 'apollo-server-errors';
import { isValidatedLogin } from '../../../common/validation/user';
import { getRandomNickname } from '../../../common/utils/nickname';
import { getAccessToken, getRefreshToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const userMutations = {
    login: async (_: any, args: any, context: any) => {
        // TODO : getToken 함수로 조건문 캡술화
        if (
            context.req.headers.authorization === undefined ||
            context.req.headers.authorization.split(' ')[1] === undefined
        ) {
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
                nickname: getRandomNickname(),
            };

            user = await knex('user').insert(userForm).returning('*');
            user = user[0];
        }

        user.accessToken = getAccessToken(user.id, user.kakaoId);
        user.refreshToken = getRefreshToken(user.id, user.kakaoId);

        return user;
    },
};

export default userMutations;
