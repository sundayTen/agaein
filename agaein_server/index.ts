import { port } from './config/environment';
import {
    initUser,
    initFindingPetArticle,
    initFindingPetArticleComment,
    initFindingOwnerArticle,
    initFindingOwnerArticleComment,
} from './graphql/database';
import app from './app';

const initDatabase = async () => {
    await initUser();
    await initFindingPetArticle();
    await initFindingPetArticleComment();
    await initFindingOwnerArticle();
    await initFindingOwnerArticleComment();
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
