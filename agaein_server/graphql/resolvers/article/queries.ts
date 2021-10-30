import { ApolloError } from 'apollo-server-errors';
import { knex } from '../../database';

const articleQueries = {
    articles: async (_: any, args: any) => {
        try {
            const rawArticles = await knex(args.boardType)
                .join('article', `${args.boardType}.article_id`, 'article.id')
                .join('user', 'article.user_id', 'user.id')
                .join('breed', `${args.boardType}.breed_id`, 'breed.id')
                .select('*', 'article.created_at as article_created_at', 'article.updated_at as article_updated_at');

            const rawImages = await knex(args.boardType).join(
                'image',
                `${args.boardType}.article_id`,
                'image.article_id',
            );

            const images: any = {};
            rawImages.forEach((rawImage: any) => {
                if (images[rawImage.articleId]) {
                    images[rawImage.articleId].push(rawImage.url);
                } else {
                    images[rawImage.articleId] = [rawImage.url];
                }
            });

            const articles: any[] = [];
            rawArticles.forEach((rawArticle: any) => {
                articles.push({
                    id: rawArticle.articleId,
                    type: rawArticle.type,
                    view: rawArticle.view,
                    images: images[rawArticle.articleId] || [],
                    author: {
                        info: rawArticle.info,
                    },
                    articleDetail: rawArticle,
                    createdAt: rawArticle.articleCreatedAt,
                    updatedAt: rawArticle.articleUpdatedAt,
                });
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
            const articleBoardType = await knex('article').where(`id`, args.id).select('type').first();

            const rawArticle = await knex(articleBoardType.type)
                .join('article', `${articleBoardType.type}.article_id`, 'article.id')
                .join('user', `article.user_id`, 'user.id')
                .join('breed', `${articleBoardType.type}.breed_id`, 'breed.id')
                .where(`article.id`, args.id)
                .select(
                    '*',
                    'article.created_at as article_created_at',
                    'article.updated_at as article_updated_at',
                    'article.type as article_type',
                )
                .first();

            const images = await knex(articleBoardType.type)
                .join('image', `${articleBoardType.type}.article_id`, 'image.article_id')
                .where(`${articleBoardType.type}.article_id`, args.id);

            const rawComments = await knex('comment')
                .join('user', 'comment.user_id', 'user.id')
                .where('comment.article_id', args.id)
                .select(
                    '*',
                    'comment.created_at as created_at',
                    'comment.updated_at as updated_at',
                    'comment.id as id',
                );

            const article: any = {
                id: rawArticle.articleId,
                type: articleBoardType.type,
                images: images.filter(function (image: any) {
                    return image.url;
                }),
                author: {
                    info: rawArticle.info,
                },
                articleDetail: rawArticle,
                comments: rawComments,
                view: rawArticle.view + 1,
                createdAt: rawArticle.articleCreatedAt,
                updatedAt: rawArticle.articleUpdatedAt,
            };

            await knex('article')
                .where('id', rawArticle.articleId)
                .update({
                    view: rawArticle.view + 1,
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
