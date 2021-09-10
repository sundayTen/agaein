import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import resolvers from './resolvers';

const gqlFiles = readdirSync(join('graphql/typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
    typeDefs += readFileSync(join('graphql/typedefs', file), {
        encoding: 'utf8',
    });
});

export { typeDefs, resolvers };
