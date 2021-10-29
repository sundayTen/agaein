import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const breedMutations = {
    createBreed: async (_: any, args: any) => {
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
    deleteBreed: async (_: any, args: any) => {
        const breed = await knex('breed').where('id', args.id).first();

        if (breed === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        await knex('breed').where('id', args.id).del();

        return args.id;
    },
};

export default breedMutations;
