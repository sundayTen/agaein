import { knex } from '../../database';

const breedQueries = {
    breeds: async (_: any) => knex('breed'),
};

export default breedQueries;
