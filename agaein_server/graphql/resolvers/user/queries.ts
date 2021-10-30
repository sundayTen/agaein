import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';

const userQueries = {
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id).first();
            return user;
        } catch {
            console.error("user에서 에러발생");
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    me: async (_: any, args: any, context: any) => {
        if (context.req.headers.authorization === undefined) {
            throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
        }
        const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;
        try {
            const user = await knex('user').where('id', userId).first();
            return user;
        } catch {
            console.error("me에서 에러발생");
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default userQueries;
