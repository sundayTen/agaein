import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleQueries = {
    articles: async (_: any, args: any) => {
        const { boardType } = args;
        try {
            const articleDetails =
                boardType === 'REVIEW'
                    ? await knex(`${boardType}`)
                    : await knex(`${boardType}`).join('breed', `${args.boardType}.breed_id`, 'breed.id');

            const articles = articleDetails.map((detail: any) => {
                const { articleId, breedId, ...detailData } = detail;
                return {
                    id: articleId,
                    articleDetail: { articleType: args.boardType, ...detailData },
                };
            });

            return articles;
        } catch {
            console.error('Articles에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    article: async (_: any, args: any) => {
        try {
            const article = await knex('article').where(`id`, args.id).first();
            const articleDetail = await knex(article.type).where('articleId', `${args.id}`).first();
            articleDetail.articleType = article.type;
            const breedObj = await knex('breed').where('id', `${articleDetail.breedId}`).first();
            const { breed, type } = breedObj;
            articleDetail.breed = breed;
            articleDetail.type = type;
            article.articleDetail = articleDetail;

            return article;
        } catch {
            console.error('Article에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default articleQueries;
