import { ID } from '../../customTypes';
import { knex } from '../../database';
import { Breed_Type, MutationCreateBreedArgs } from '../../types';

export async function getBreedById(id: ID) {
    return await knex('breed').where('id', id).first();
}

export async function getBreeds(type: Breed_Type) {
    return await knex('breed').where('type', type);
}

export async function createBreed(breed: MutationCreateBreedArgs) {
    const breeds = await knex('breed').insert(breed).returning('*');
    
    return breeds[0];
}

export async function deleteBreed(id: String) {
    return await knex('breed').where('id', id).del();
}
