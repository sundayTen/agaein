import { knex } from '../../database';

const userQueries = {
    users: async (_: any) => knex('user'),
    user: async (_: any, args: any) => {
        try {
            const user = await knex('user').where('id', args.id).first();
            return user;
        } catch {
            console.error();
        }
    },
    me: async (_: any, context: any) => {
        console.log(context.req.headers)
        return
        // try {
        //     const user = await knex('user').where('id', args.id).first();
        //     return user;
        // } catch {
        //     console.error();
        // }
    },
};

export default userQueries;
