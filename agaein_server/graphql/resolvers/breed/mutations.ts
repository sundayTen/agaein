import { MutationCreateBreedArgs, MutationDeleteBreedArgs } from '../../types';
import { createBreed, deleteBreed } from './services';

const breedMutations = {
    createBreed: async (_: any, breed: MutationCreateBreedArgs) => {
        return await createBreed(breed);
    },
    deleteBreed: async (_: any, breed: MutationDeleteBreedArgs) => {
        return deleteBreed(breed.id);
    },
};

export default breedMutations;
