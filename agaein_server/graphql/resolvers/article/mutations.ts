import { ApolloError } from 'apollo-server-errors';
import { getUserId } from '../../../common/auth/jwtToken';
import { Date } from '../../customTypes';
import {
    MutationCreateArticleArgs,
    MutationCreateCommentArgs,
    MutationDeleteArticleArgs,
    MutationDeleteCommentArgs,
    MutationDoneArgs,
    MutationUpdateArticleArgs,
    MutationUpdateCommentArgs
} from '../../types';
import {
    createArticle,
    createComment,
    deleteArticle,
    done,
    sendAlarmByComment,
    updateArticle,
    updateComment
} from './mutationServices';
import { getArticleById, getArticleByIdAndUserId, getCommentById } from './queryServices';

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
    createComment: async (_: any, createCommentRequest: MutationCreateCommentArgs, context: any) => {
        const { articleId, commentId, content, password } = createCommentRequest;
        const now: Date = new Date();
        const commentForm: any = {
            userId: 1,
            articleId,
            commentId,
            content,
            password,
            createdAt: now,
            updatedAt: now,
        };

        if (commentId) {
            const comment: any = await getCommentById(commentId);
            if (comment.commentId) {
                throw new ApolloError('Comment Depth Error', 'INTERNAL_SERVER_ERROR');
            }
        }

        if (password === undefined) {
            commentForm.userId = getUserId(context.req.headers.authorization);
        }

        const comment: any = await createComment(commentForm);
        sendAlarmByComment(articleId, comment.content);

        return comment;
    },
    updateComment: async (_: any, updateCommentRequest: MutationUpdateCommentArgs, context: any) => {
        const { id, content, password } = updateCommentRequest;
        const comment: any = await getCommentById(id);

        if (comment === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (content === '') {
            throw new ApolloError('Empty Content', 'BAD_USER_INPUT');
        }

        if (password) {
            if (password !== comment.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization) {
            if (comment.userId != getUserId(context.req.headers.authorization)) {
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

        return await updateComment(commentForm, id);
    },
    deleteComment: async (_: any, deleteCommentRequest: MutationDeleteCommentArgs, context: any) => {
        const { id, password } = deleteCommentRequest;
        const comment = await getCommentById(id);

        if (comment === undefined || comment.content === '') {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (password) {
            if (password != comment.password) {
                throw new ApolloError('Wrong Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization) {
            if (comment.userId != getUserId(context.req.headers.authorization)) {
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

        await updateComment(commentForm, id);

        return id;
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
