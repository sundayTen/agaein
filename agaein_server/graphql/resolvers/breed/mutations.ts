import { ApolloError } from 'apollo-server-errors';
import { MutationCreateBreedArgs, MutationDeleteBreedArgs } from '../../types';
import { createBreed, deleteBreed } from './services';

const breedMutations = {
    createBreed: async (_: any, breed: MutationCreateBreedArgs) => {
        return await createBreed(breed);
    },
    deleteBreed: async (_: any, breed: MutationDeleteBreedArgs) => {
        if ((await deleteBreed(breed.id)) === 0) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }
        
        return breed.id;
    },
};

export default breedMutations;
