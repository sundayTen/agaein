import { getUserId } from '../../../common/auth/jwtToken';
import { Profile, QueryUserArgs } from '../../types';
import { getCommentsByUserId, getLfgsByUserId, getLfpsByUserId, getReviewsByUserId } from '../article/queryServices';
import { getBookmarkArticlesByUserId } from '../bookmark/services';
import { getProfileReportsByUserId } from '../report/services';
import { getUserById } from './services';

const userQueries = {
    user: async (_: any, userRequest: QueryUserArgs) => {
        return await getUserById(userRequest.id);
    },
    me: async (_: any, __: any, context: any) => {
        const userId: number = getUserId(context.req.headers.authorization);

        return await getUserById(userId);
    },
    profile: async (_: any, __: any, context: any) => {
        const userId: number = getUserId(context.req.headers.authorization);
        const profile: Profile = {
            user: await getUserById(userId),
            lfps: await getLfpsByUserId(userId),
            lfgs: await getLfgsByUserId(userId),
            comments: await getCommentsByUserId(userId),
            reviews: await getReviewsByUserId(userId),
            reports: await getProfileReportsByUserId(userId),
            bookmarks: await getBookmarkArticlesByUserId(userId),
        };

        return profile;
    },
};

export default userQueries;
