import { port } from './config/environment';
import {
    initUser,
    initArticle,
    initComment,
    initBreed,
    initImage,
    initLFG,
    initLFP,
    initReview,
    initBookmark,
    initKeyword,
    initArticleKeyword,
    initReport,
    initCrawlingSite,
    initCrawlingResult,
} from './graphql/database';
import app from './app';

const initDatabase = async () => {
    await initUser();
    await initArticle();
    await initComment();
    await initBreed();
    await initImage();
    await initLFG();
    await initLFP();
    await initReview();
    await initBookmark();
    await initKeyword();
    await initArticleKeyword();
    await initReport();
    await initCrawlingSite();
    await initCrawlingResult();
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
