import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';

const bookmarkMutations = {
    createBookmark: async (_: any, args: any, context: any) => {
        if (context.req.headers.authorization === undefined) {
            throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
        }
        const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;

        const bookmark = await knex('bookmark').where({ user_id: userId, article_id: args.articleId }).first();

        if (bookmark !== undefined) {
            throw new ApolloError('Already Exists', 'BAD_USER_INPUT');
        }

        const bookmarkForm = {
            userId: userId,
            articleId: args.articleId,
        };

        try {
            const bookmarks = await knex('bookmark').insert(bookmarkForm).returning('*');
            return bookmarks[0];
        } catch {
            console.error('createBookmark에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    deleteBookmark: async (_: any, args: any, context: any) => {
        if (context.req.headers.authorization === undefined) {
            throw new ApolloError('Token is not Existed', 'UNAUTHENTICATED');
        }
        const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
        const userId = (<any>jwtToken).userId;

        const bookmark = await knex('bookmark').where('articleId', args.id).first();

        if (bookmark === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (bookmark.userId !== userId) {
            throw new ApolloError('Wrong User', 'UNAUTHENTICATED');
        }

        await knex('bookmark').where('id', args.id).del();

        return args.id;
    },
};

export default bookmarkMutations;
