import { knex } from '../../database';

const breedQueries = {
    breeds: async (_: any, args: any) => knex('breed').where('type', args.type),
};

export default breedQueries;
