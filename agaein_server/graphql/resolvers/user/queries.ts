import { knex } from '../../database';

const userQueries = {
    users: async (_: any) => knex('user'),
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id);
            return user[0];
        } catch {
            console.error();
        }
    },
};

export default userQueries;
