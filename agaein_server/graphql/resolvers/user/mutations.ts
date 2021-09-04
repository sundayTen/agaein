import { knex } from '../../database';

const userMutations = {
    signup: async (_: any, args: any) => {
        const now = new Date();
        const info = {
            info: JSON.stringify(args.User),
            created_at: now,
            updated_at: now,
        };
        try {
            await knex('user').insert(info);
        } catch {
            console.error("User Insert Error");
        }
        
        return 'success';
    },
};

export default userMutations;
