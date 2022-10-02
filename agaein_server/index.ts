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
    initCrawlingPetResult,
    initCrawlingOwnerResult,
    initCrawlingHistory,
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
    await initCrawlingPetResult();
    await initCrawlingOwnerResult();
    await initCrawlingHistory();
};

const start = async () => {
    try {
        await app.listen(port);
        console.log(`🚀  GraphQL server running at port: ${port}`);
        console.log(`✅  ${process.env.NODE_ENV} mode start`);
    } catch {
        console.log('Not able to run GraphQL server');
    }
};

initDatabase();
start();
