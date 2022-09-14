import { getUserId } from '../../../common/auth/jwtToken';
import { validateAuthorizationHeader } from '../../../common/validation/auth';
import { getBookmarksByUserId } from './services';

const bookmarkQueries = {
    bookmarks: async (_: any, __: any, context: any) => {
        const authorization: string = context.req.headers.authorization;
        validateAuthorizationHeader(authorization);
        const userId: number = getUserId(authorization);

        return getBookmarksByUserId(userId);
    },
};

export default bookmarkQueries;
