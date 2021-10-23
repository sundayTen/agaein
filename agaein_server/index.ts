import { port } from './config/environment';
import {
    initUser,
    initArticle,
    initComment,
    initNestedComment,
    initBreed,
    initImage,
    initLFG,
    initLFP,
    initReview,
} from './graphql/database';
import app from './app';

const initDatabase = async () => {
    await initUser();
    await initArticle();
    await initComment();
    await initNestedComment();
    await initBreed();
    await initImage();
    await initLFG();
    await initLFP();
    await initReview();
};

const start = async () => {
    try {
        await app.listen(port);
        console.log(`🚀  GraphQL server running at port: ${port}`);
    } catch {
        console.log('Not able to run GraphQL server');
    }
};

initDatabase();
start();
