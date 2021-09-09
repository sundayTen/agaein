import express from 'express';
import apolloServer from './graphql';

const app = express();

apolloServer.applyMiddleware({
    app,
    path: '/graphql',
});

export default app;
