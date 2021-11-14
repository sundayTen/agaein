import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleQueries = {
    articles: async (_: any, args: any) => {
        const { boardType, limit = 6, offset = 0 } = args;
        try {
            const articleDetails =
                boardType === 'REVIEW'
                    ? await knex(`${boardType}`)
                          .join('article', 'article.id', `${boardType}.article_id`)
                          .orderBy('created_at', 'desc')
                          .limit(limit)
                          .offset(offset)
                    : await knex(`${boardType}`)
                          .join('article', 'article.id', `${boardType}.article_id`)
                          .join('breed', `${boardType}.breed_id`, 'breed.id')
                          .orderBy('created_at', 'desc')
                          .limit(limit)
                          .offset(offset);

            const articles = articleDetails.map((detail: any) => {
                const { articleId, breedId, keyword, ...detailData } = detail;
                detail.id = articleId;
                detail.articleDetail = { articleType: args.boardType, ...detailData };
                return detail;
            });

            return articles;
        } catch {
            console.error('Articles에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
    article: async (_: any, args: any) => {
        const { id } = args;
        try {
            const article = await knex('article').where(`id`, id).first();
            const articleDetail = await knex(article.type).where('articleId', `${id}`).first();
            articleDetail.articleType = article.type;

            const breedObj = await knex('breed').where('id', articleDetail.breedId).first();
            const { breed, type } = breedObj;
            articleDetail.breed = breed;
            articleDetail.type = type;

            const keywordObj = await knex('article_keyword')
                .join('keyword', 'keyword.id', 'article_keyword.keyword_id')
                .where('article_id', args.id);
            const keyword = keywordObj.map((keyword: any) => keyword.keyword);
            articleDetail.keyword = keyword;

            article.articleDetail = articleDetail;
            await knex('article')
                .where('id', id)
                .update({
                    view: article.view + 1,
                });

            return article;
        } catch {
            console.error('Article에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default articleQueries;
