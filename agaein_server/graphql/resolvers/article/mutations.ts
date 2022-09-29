import { ApolloError } from 'apollo-server-errors';
import { getUserId, readAccessToken } from '../../../common/auth/jwtToken';
import { sendEmail } from '../../../common/utils/email';
import { Date } from '../../customTypes';
import { knex } from '../../database';
import {
    MutationCreateArticleArgs,
    MutationDeleteArticleArgs,
    MutationDoneArgs,
    MutationUpdateArticleArgs,
} from '../../types';
import { createArticle, deleteArticle, done, updateArticle } from './mutationServices';
import { getArticleById, getArticleByIdAndUserId } from './queryServices';

const articleMutations = {
    createArticle: async (_: any, createArticleRequest: MutationCreateArticleArgs, context: any) => {
        const { boardType, articleDetail, files } = createArticleRequest;
        const now: Date = new Date();
        const article: any = {
            userId: 1,
            view: 0,
            type: boardType,
            createdAt: now,
            updatedAt: now,
        };

        if (articleDetail.password === undefined) {
            const userId: number = getUserId(context.req.headers.authorization);
            article.userId = userId;
        }

        return await createArticle(article, boardType, articleDetail, files);
    },
    updateArticle: async (_: any, updateArticleRequest: MutationUpdateArticleArgs, context: any) => {
        const { id, articleDetail, files } = updateArticleRequest;
        const articleData: any = await getArticleById(id);

        if (articleData === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        const now = new Date();
        const article: any = {
            userId: 1,
            updatedAt: now,
        };

        if (articleDetail.password) {
            if (articleDetail.password !== articleData.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization) {
            const userId: number = getUserId(context.req.headers.authorization);
            if (articleData.userId != userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
            article.userId = articleData.userId;
        } else {
            throw new ApolloError('Must Need AccessToken or Password', 'UNAUTHENTICATED');
        }

        return await updateArticle(id, article, articleDetail, files);
    },
    deleteArticle: async (_: any, deleteArticleRequest: MutationDeleteArticleArgs, context: any) => {
        const article = await getArticleById(deleteArticleRequest.id);

        if (article === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (deleteArticleRequest.password) {
            if (deleteArticleRequest.password !== article.password) {
                throw new ApolloError('Wrong Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const userId: number = getUserId(context.req.headers.authorization);
            if (article.userId != userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Wrong Route', 'UNAUTHENTICATED');
        }

        return await deleteArticle(deleteArticleRequest.id);
    },
    createComment: async (_: any, args: any, context: any) => {
        const now = new Date();
        const { articleId, commentId, content, password } = args;
        const commentForm = {
            userId: 1,
            articleId,
            commentId,
            content,
            password,
            createdAt: now,
            updatedAt: now,
        };

        if (commentId) {
            const comment = await knex('comment').where('id', commentId).first();
            if (comment.commentId) {
                throw new ApolloError('Comment Depth Error', 'INTERNAL_SERVER_ERROR');
            }
        }

        if (
            password === undefined &&
            context.req.headers.authorization &&
            context.req.headers.authorization.split(' ')[1]
        ) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            commentForm.userId = (<any>jwtToken).userId;
        }

        try {
            const comments = await knex('comment').insert(commentForm).returning('*');
            const comment = comments[0];
            const article = await knex('article').where('id', articleId).first();
            const articleDetail = await knex(`${article.type}`).where('article_id', articleId).first();
            const user = await knex('user').where('id', article.userId).first();

            if (articleDetail.alarm) {
                user.email && sendEmail(user.email, articleId, comment.content);
            }

            return comment;
        } catch (err: any) {
            console.error('createComment에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    updateComment: async (_: any, args: any, context: any) => {
        const comment = await knex('comment').where('id', args.id).first();

        if (comment === undefined || comment.content === '') {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        const { id, content, password } = args;

        if (content === '') {
            throw new ApolloError('Empty Content', 'BAD_USER_INPUT');
        }

        if (password) {
            if (password !== comment.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            const commentUser = await knex('comment').where('id', id).first('userId');
            if (commentUser.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Must Need AccessToken or Password', 'UNAUTHENTICATED');
        }

        const now = new Date();
        const commentForm = {
            content,
            updatedAt: now,
        };

        try {
            const comments = await knex('comment').update(commentForm).where('id', id).returning('*');
            const comment = comments[0];
            return comment;
        } catch (err: any) {
            console.error('createComment에서 에러발생');
            console.trace();

            throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
        }
    },
    deleteComment: async (_: any, args: any, context: any) => {
        const comment = await knex('comment').where('id', args.id).first();

        if (comment === undefined || comment.content === '') {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (args.password) {
            if (args.password !== comment.password) {
                throw new ApolloError('Wrong Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (comment.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Unautorized Token', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Wrong Route', 'UNAUTHENTICATED');
        }

        const now = new Date();
        const commentForm = {
            content: '',
            updatedAt: now,
        };

        await knex('comment').update(commentForm).where('id', args.id);

        return args.id;
    },
    done: async (_: any, doneRequest: MutationDoneArgs, context: any) => {
        const userId: number = getUserId(context.req.headers.authorization);
        const article: any = await getArticleByIdAndUserId(doneRequest.articleId, userId);
        if (article === undefined) {
            throw new ApolloError('Wrong Id Or User', 'BAD_USER_INPUT');
        }

        await done(article.type, doneRequest.articleId);

        return doneRequest.articleId;
    },
};

export default articleMutations;
