import { getUserId } from '../../../common/auth/jwtToken';
import { MutationCrawlingArgs } from '../../types';
import { processCrawling } from './services';

const crawlingMutations = {
    crawling: async (_: any, crawlingRequest: MutationCrawlingArgs, context: any) => {
        let userId: number = 1;
        const authorization: string = context.req.headers.authorization;
        if (authorization && authorization.split(' ')[1]) {
            userId = getUserId(authorization);
        }

        return await processCrawling(userId, crawlingRequest.baseInfo, crawlingRequest.type);
    },
};

export default crawlingMutations;
