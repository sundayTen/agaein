import { QueryBreedsArgs } from '../../types';
import { getBreeds } from './services';

const breedQueries = {
    breeds: async (_: any, args: QueryBreedsArgs) => {
        return await getBreeds(args.type);
    },
};

export default breedQueries;
