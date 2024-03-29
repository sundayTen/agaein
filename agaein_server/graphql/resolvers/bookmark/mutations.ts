import { ApolloError } from 'apollo-server-errors';
import { getUserId } from '../../../common/auth/jwtToken';
import { validateAuthorizationHeader } from '../../../common/validation/auth';
import { MutationCreateBookmarkArgs, MutationDeleteBookmarkArgs } from '../../types';
import { createBookmark, deleteBookmark, getBookmarkByUserIdAndArticleId } from './services';

const bookmarkMutations = {
    createBookmark: async (_: any, createBookmarkRequest: MutationCreateBookmarkArgs, context: any) => {
        const authorization: string = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);
        const userId: number = getUserId(authorization);
        const bookmark = await getBookmarkByUserIdAndArticleId(userId, createBookmarkRequest.articleId);

        if (bookmark !== undefined) {
            throw new ApolloError('Bookmark is existed', 'BAD_USER_INPUT');
        }

        return await createBookmark(userId, createBookmarkRequest.articleId);
    },
    deleteBookmark: async (_: any, deleteBookmarkRequest: MutationDeleteBookmarkArgs, context: any) => {
        const authorization: string = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);
        const userId: number = getUserId(authorization);
        const bookmark = await getBookmarkByUserIdAndArticleId(userId, deleteBookmarkRequest.articleId);

        if (bookmark === undefined) {
            throw new ApolloError('Wrong articleId', 'BAD_USER_INPUT');
        }

        if (bookmark.userId !== userId) {
            throw new ApolloError('Wrong User', 'UNAUTHENTICATED');
        }

        return await deleteBookmark(bookmark.id);
    },
};

export default bookmarkMutations;
