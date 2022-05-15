import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';

const bookmarkQueries = {
    bookmarks: async (_: any, args: any, context: any) => {
        if (context.req.headers.authorization === undefined) {
            throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
        }
        const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;
        try {
            return knex('bookmark').where('user_id', userId);
        } catch (err: any) {
            console.error("bookmarks에서 에러발생");
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default bookmarkQueries;
