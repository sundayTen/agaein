import { knex } from '../../database';
import { Breed_Type, MutationCreateBreedArgs } from '../../types';

export function getBreeds(type: Breed_Type) {
    return knex('breed').where('type', type);
}

export async function createBreed(breed: MutationCreateBreedArgs) {
    const breeds = await knex('breed').insert(breed).returning('*');
    
    return breeds[0];
}

export async function deleteBreed(id: String) {
    return knex('breed').where('id', id).del();
}
