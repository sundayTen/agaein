import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const crawlingMutations = {
    crawling: async (_: any, args: any) => {
        return "1";
    },
};

export default crawlingMutations;
