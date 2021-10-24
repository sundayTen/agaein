import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import apolloServer from './graphql';
import cors from 'cors';
const app = express();

app.use(graphqlUploadExpress());
app.use(
    cors({
        origin: 'https://www.agaein.com/graphql',
        credentials: true,
    }),
);

apolloServer.applyMiddleware({
    app,
    path: '/graphql',
});

export default app;
