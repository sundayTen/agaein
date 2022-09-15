import { ApolloError } from 'apollo-server-express';
import { getUserId } from '../../../common/auth/jwtToken';
import { QueryCrawlingResultsArgs } from '../../types';
import { getCrawlingHistory, getCrawlingResults } from './services';

const crawlingQueries = {
    crawlingResults: async (_: any, crawlingRequest: QueryCrawlingResultsArgs) =>
        getCrawlingResults(crawlingRequest.id),
    crawlingHistory: async (_: any, __: any, context: any) => {
        let userId: number;
        const authorization: string = context.req.headers.authorization;
        if (authorization && authorization.split(' ')[1]) {
            userId = getUserId(authorization);
        } else {
            throw new ApolloError('No Authorization', 'BAD_USER_INPUT');
        }

        return await getCrawlingHistory(userId);
    },
};

export default crawlingQueries;
