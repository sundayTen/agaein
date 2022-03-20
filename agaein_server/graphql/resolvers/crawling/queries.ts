import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { resourceLimits } from 'worker_threads';

const crawlingQueries = {
    crawlingResults: async (_: any, args: any) => {
        const history = await knex('crawling_history').where('id', args.id).first();

        if (history === undefined) {
            throw new ApolloError(`CrawlingResults id(${args.id}) is not Exists`, 'BAD_USER_INPUT');
        }

        return history.crawlingResults.results.map((result: any) => result.value).splice(0, 100);
    },
    crawlingHistory: async (_: any, args: any, context: any) => {
        let userId = 1;
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            userId = (<any>jwtToken).userId;
        }

        const user = await knex('user').where('id', userId).first();

        const rawHistories = await knex('crawling_history').where('user_id', userId);

        const histories = rawHistories.map((history: any) => {
            history.user = user;
            history.crawlingResults = history.crawlingResults.results.map((result: any) => result.value);
            return history;
        });

        return histories;
    },
};

export default crawlingQueries;
