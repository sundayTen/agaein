import { ApolloError } from 'apollo-server-errors';
import crypto from 'crypto';
import { passwordHashKey } from '../../../config/environment';
import { isValidatedSignup, isValidatedLogin } from '../../../common/validation/user';
import { getAccessToken, getRefreshToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const userMutations = {
    signup: async (_: any, args: any, context: any) => {
        if (!isValidatedSignup(args.User)) {
            throw new ApolloError('isNotValidated', 'BAD_USER_INPUT');
        }

        const user = await knex('user').whereRaw('info->>? = ?', ['email', args.User.email]).first();

        if (user) {
            throw new ApolloError('Already Existed Email', 'BAD_USER_INPUT');
        }

        args.User.password = crypto.createHmac('sha256', passwordHashKey).update(args.User.password).digest('hex');

        const now = new Date();
        const info = {
            info: JSON.stringify(args.User),
            created_at: now,
            updated_at: now,
        };

        try {
            const userIds = await knex('user').insert(info).returning('id');
            const userId = userIds[0];

            context.res.cookie('accessToken', getAccessToken(userId, args.User.email), {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            context.res.cookie('refreshToken', getRefreshToken(userId, args.User.email), {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return 'success';
        } catch {
            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },

    login: async (_: any, args: any, context: any) => {
        if (!isValidatedLogin(args.User)) {
            throw new ApolloError('isNotValidated', 'BAD_USER_INPUT');
        }

        args.User.password = crypto.createHmac('sha256', passwordHashKey).update(args.User.password).digest('hex');

        const user = await knex('user')
            .whereRaw('info->>? = ? AND info->>? = ?', ['email', args.User.email, 'password', args.User.password])
            .first();
        if (!user) {
            throw new ApolloError('Invaild Account Or Password', 'UNAUTHENTICATED');
        }

        context.res.cookie('accessToken', getAccessToken(user.id, args.User.email), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        context.res.cookie('refreshToken', getRefreshToken(user.id, args.User.email), {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return 'success';
    },
};

export default userMutations;
