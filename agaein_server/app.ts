import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import apolloServer from './graphql';

const app = express();

app.use(graphqlUploadExpress());

apolloServer.applyMiddleware({
    app,
    path: '/graphql',
});

export default app;
