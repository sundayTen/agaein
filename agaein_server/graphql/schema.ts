import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import resolvers from './resolvers';

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), {
        encoding: 'utf8',
    });
});

export { typeDefs, resolvers };
