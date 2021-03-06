import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleQueries = {
    articles: async (_: any, args: any) => {
        const { boardType, limit = 6, offset = 0, order = 'new', search } = args;

        if (search !== undefined) {
            const splitted_search = search.split(' ');
            if (splitted_search.length > 1) {
                splitted_search.push(search);
            }

            let allArticleDetails: Array<any> = [];

            for (const search of splitted_search) {
                try {
                    const articleDetails =
                        boardType === 'REVIEW'
                            ? await knex(`${boardType}`)
                                  .join('article', 'article.id', `${boardType}.article_id`)
                                  .where(`${boardType}.content`, 'like', `%${search}%`)
                                  .orWhere(`${boardType}.title`, 'like', `%${search}%`)
                                  .orderBy(order === 'view' ? 'view' : 'created_at', order === 'old' ? 'asc' : 'desc')
                                  .limit(limit)
                                  .offset(offset)
                            : await knex(`${boardType}`)
                                  .join('article', 'article.id', `${boardType}.article_id`)
                                  .join('breed', `${boardType}.breed_id`, 'breed.id')
                                  .join('article_keyword', 'article.id', 'article_keyword.article_id')
                                  .join('keyword', 'article_keyword.keyword_id', 'keyword.id')
                                  .where(`${boardType}.name`, search)
                                  .orWhere(`${boardType}.feature`, 'like', `%${search}%`)
                                  .orWhere(
                                      'breed.type',
                                      search === '강아지' || search === '개'
                                          ? 'DOG'
                                          : search === '고양이' || search === '냥이'
                                          ? 'CAT'
                                          : 'X',
                                  )
                                  .orWhere('breed.breed', search)
                                  .orWhere('keyword.keyword', search)
                                  .select('*', `${boardType}.id as id`)
                                  .orderBy(order === 'view' ? 'view' : 'created_at', order === 'old' ? 'asc' : 'desc')
                                  .limit(limit)
                                  .offset(offset);
                    allArticleDetails = allArticleDetails.concat([...articleDetails]);
                } catch (err: any) {
                    console.error('Articles 검색에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                }
            }

            const distinct: any = {};
            const articles = allArticleDetails.reduce((res: any, detail: any) => {
                const { articleId, ...detailData } = detail;

                if (distinct[detail.articleId] === undefined) {
                    distinct[detail.articleId] = true;
                    detail.id = articleId;
                    detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
                    detail.articleDetail.keyword = null;
                    res.push(detail);
                }

                return res;
            }, []);

            return articles;
        }

        try {
            const articleDetails =
                boardType === 'REVIEW'
                    ? await knex(`${boardType}`)
                          .join('article', 'article.id', `${boardType}.article_id`)
                          .orderBy(order === 'view' ? 'view' : 'created_at', order === 'old' ? 'asc' : 'desc')
                          .limit(limit)
                          .offset(offset)
                    : await knex(`${boardType}`)
                          .join('article', 'article.id', `${boardType}.article_id`)
                          .join('breed', `${boardType}.breed_id`, 'breed.id')
                          .select('*', `${boardType}.id as id`)
                          .orderBy(order === 'view' ? 'view' : 'created_at', order === 'old' ? 'asc' : 'desc')
                          .limit(limit)
                          .offset(offset);

            const articles = articleDetails.map((detail: any) => {
                const { articleId, ...detailData } = detail;
                detail.id = articleId;
                detail.articleDetail = { articleType: args.boardType, articleId, ...detailData };
                return detail;
            });

            return articles;
        } catch (err: any) {
            console.error('Articles에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    articleLength: async (_: any, args: any) => {
        try {
            const articleLength = await knex(`${args.boardType}`).count('*').first();

            return articleLength.count;
        } catch (err: any) {
            console.error('articleLength에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    article: async (_: any, args: any) => {
        const { id } = args;
        try {
            const article = await knex('article').where(`id`, id).first();
            const articleDetail = await knex(article.type).where('articleId', `${id}`).first();
            articleDetail.articleType = article.type;

            if (article.type !== 'REVIEW') {
                const breedObj = await knex('breed').where('id', articleDetail.breedId).first();
                const { breed, type } = breedObj;
                articleDetail.breed = breed;
                articleDetail.type = type;

                const keywordObj = await knex('article_keyword')
                    .join('keyword', 'keyword.id', 'article_keyword.keyword_id')
                    .where('article_id', args.id);
                const keyword = keywordObj.map((keyword: any) => keyword.keyword);
                articleDetail.keyword = keyword;
            }

            article.articleDetail = articleDetail;

            await knex('article')
                .where('id', id)
                .update({
                    view: article.view + 1,
                });

            return article;
        } catch (err: any) {
            console.error('Article에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
};

export default articleQueries;
