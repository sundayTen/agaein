import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const breedMutations = {
    createBreed: async (_: any, args: any, context: any) => {
        const breedForm = {
            type: args.type,
            breed: args.breed,
        };
        try {
            const breeds = await knex('breed').insert(breedForm).returning('*');
            const breed = breeds[0];
            return breed;
        } catch {
            console.error('createBreed에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
        
    },
};

export default breedMutations;
