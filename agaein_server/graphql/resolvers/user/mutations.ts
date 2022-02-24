import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { validateLogin } from '../../../common/validation/user';
import { getRandomNickname } from '../../../common/utils/nickname';
import { getAccessToken, getRefreshToken, readAccessToken } from '../../../common/auth/jwtToken';
import { validateAuthorizationHeader } from '../../../common/validation/auth';

const userMutations = {
    login: async (_: any, args: any, context: any) => {
        const authorization = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);
        validateLogin(args.kakaoId)

        let user = await knex('user').where('kakao_id', args.kakaoId).first();
        if (user === undefined) {
            const now = new Date();
            const userForm = {
                kakao_id: args.kakaoId,
                created_at: now,
                updated_at: now,
                nickname: getRandomNickname(),
            };

            const users = await knex('user').insert(userForm).returning('*');
            user = users[0];
        }

        user.accessToken = getAccessToken(user.id, user.kakaoId);
        user.refreshToken = getRefreshToken(user.id, user.kakaoId);

        return user;
    },
    updateUser: async (_: any, args: any, context: any) => {
        const authorization = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);

        const { email, nickname, phoneNumber } = args;
        const userForm: any = {};
        userForm.email = email ? email : null;
        userForm.nickname = nickname ? nickname : null;
        userForm.phoneNumber = phoneNumber ? phoneNumber : null;
        userForm.updatedAt = new Date();

        const jwtToken = readAccessToken(authorization.split(' ')[1]);
        return (
            await knex('user')
                .update(userForm)
                .where('id', (<any>jwtToken).userId)
                .returning('*')
        )[0];
    },
};

export default userMutations;
