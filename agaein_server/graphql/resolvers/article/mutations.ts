import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleMutations = {
    createArticle: async (_: any, args: any, context: any) => {
        const now = new Date();
        const info = {
            // 임시로 18 넣음
            user_id: 18,
            info: JSON.stringify(args.Article),
            created_at: now,
            updated_at: now,
        };

        try {
            if (args.boardType === 'LFP') {
                const articles = await knex('looking_for_pet_article').insert(info).returning('*');
                const article = articles[0];
                return article;
            }
            if (args.boardType === 'LFG') {
                const articles = await knex('looking_for_guardian_article').insert(info).returning('*');
                const article = articles[0];
                return article;
            }
        } catch {
            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    singleUpload: async (_: any, args: any) => {
        console.log(args);
        const { createReadStream, filename, mimetype, encoding } = await args.file;
        console.log(filename);

        const stream = createReadStream();

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        const out = require('fs').createWriteStream(filename);
        await stream.pipe(out);
        await stream.on("close", () => {
            console.log("done")
        });
        return { filename, mimetype, encoding };
    },
};

export default articleMutations;
