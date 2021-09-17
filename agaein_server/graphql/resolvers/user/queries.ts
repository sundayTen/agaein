import { knex } from '../../database';

const userQueries = {
    users: async (_: any) => knex('user'),
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id).first();
            console.log(user.created_at);
            return user;
        } catch {
            console.error();
        }
    },
};

export default userQueries;
