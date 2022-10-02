import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import {
    initArticle,
    initArticleKeyword,
    initBookmark,
    initBreed,
    initComment,
    initCrawlingHistory,
    initCrawlingOwnerResult,
    initCrawlingPetResult,
    initCrawlingSite,
    initImage,
    initKeyword,
    initLFG,
    initLFP,
    initReport,
    initReview,
    initUser,
} from '../graphql/database';
import { resolvers, typeDefs } from '../graphql/schema';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

export const testServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: false,
    uploads: false,
});

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

initDatabase();

export const getAccessToken = () => {
    return process.env.TEST_JWT;
};
