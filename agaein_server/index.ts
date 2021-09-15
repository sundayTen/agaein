import { port } from './config/environment';
import {
    initUser,
    initLookingForPetArticle,
    initLookingForPetArticleComment,
    initLookingForGuardianArticle,
    initLookingForGuardianArticleComment,
} from './graphql/database';
import app from './app';

const initDatabase = async () => {
    await initUser();
    await initLookingForPetArticle();
    await initLookingForPetArticleComment();
    await initLookingForGuardianArticle();
    await initLookingForGuardianArticleComment();
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
