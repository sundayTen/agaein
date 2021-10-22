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
            rawArticles.forEach((rawArticle: any, idx: number) => {
                articles.push({
                    id: rawArticle.articleId,
                    title: rawArticle.title,
                    content: rawArticle.content,
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
            const rawArticle = await knex(args.boardType)
                .join('article', `${args.boardType}.article_id`, 'article.id')
                .join('user', `article.user_id`, 'user.id')
                .join('breed', `${args.boardType}.breed_id`, 'breed.id')
                .where(`${args.boardType}.article_id`, args.id)
                .select('*', 'article.created_at as article_created_at', 'article.updated_at as article_updated_at')
                .first();

            const images = await knex(args.boardType)
                .join('image', `${args.boardType}.article_id`, 'image.article_id')
                .where(`${args.boardType}.article_id`, args.id);

            const rawComments = await knex('comment')
                .join('user', 'comment.user_id', 'user.id')
                .where('comment.article_id', args.id)
                .select(
                    '*',
                    'comment.created_at as created_at',
                    'comment.updated_at as updated_at',
                    'comment.id as id',
                );

            const rawNestedComments = await knex('comment')
                .join('nested_comment', 'comment.id', 'nested_comment.comment_id')
                .join('user', `nested_comment.user_id`, 'user.id')
                .where('comment.article_id', args.id)
                .select(
                    '*',
                    'nested_comment.created_at as created_at',
                    'nested_comment.updated_at as updated_at',
                    'nested_comment.id as id',
                );

            const nestedComments: any = {};
            rawNestedComments.forEach((rawNestedComment: any) => {
                if (nestedComments[rawNestedComment.commentId]) {
                    nestedComments[rawNestedComment.commentId].push(rawNestedComment);
                } else {
                    nestedComments[rawNestedComment.commentId] = [rawNestedComment];
                }
            });

            const article: any = {
                id: rawArticle.articleId,
                title: rawArticle.title,
                content: rawArticle.content,
                images: images.filter(function (image: any) {
                    return image.url;
                }),
                author: {
                    info: rawArticle.info,
                },
                articleDetail: rawArticle,
                comments: [],
                createdAt: rawArticle.articleCreatedAt,
                updatedAt: rawArticle.articleUpdatedAt,
            };

            rawComments.forEach((rawComment: any) => {
                rawComment.nestedComments = nestedComments[rawComment.id] || [];
                article.comments.push(rawComment);
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
