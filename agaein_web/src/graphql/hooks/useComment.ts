import {
    MutationCreateCommentArgs,
    MutationDeleteCommentArgs,
    MutationUpdateCommentArgs,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
} from 'graphql/generated/generated';

const useComment = () => {
    const [create] = useCreateCommentMutation();
    const [edit] = useUpdateCommentMutation();
    const [drop] = useDeleteCommentMutation();

    const createComment = (params: MutationCreateCommentArgs) => {
        const { articleId, commentId, content, password } = params;
        create({
            variables: {
                articleId,
                content,
                password,
                commentId,
            },
            update: (cache) => {
                try {
                    cache.modify({
                        id: `Article:${articleId}`,
                        fields: {
                            comments: (prevComments) => {
                                const newComment = {
                                    __typename: 'Comment',
                                    content,
                                };
                                return [...prevComments, newComment];
                            },
                        },
                    });
                } catch (error) {
                    console.error(`Error occur while caching`, error);
                }
            },
        });
    };

    const updateComment = (params: MutationUpdateCommentArgs) => {
        const { id, content, password } = params;
        edit({
            variables: {
                id,
                content,
                password,
            },
            update: (cache) => {
                try {
                    cache.modify({
                        id: `Comment:${id}`,
                        fields: {
                            content: () => {
                                return content;
                            },
                        },
                    });
                } catch (error) {
                    console.error('Error at Caching : ', error);
                }
            },
        });
    };
    const deleteComment = (params: MutationDeleteCommentArgs, articleId: string) => {
        const { id, password } = params;
        drop({
            variables: {
                id,
                password,
            },
            update: (cache) => {
                try {
                    const normalizedId = `Article:${articleId}`;
                    cache.evict({ id: normalizedId });
                    cache.gc();
                } catch (error) {
                    console.error(`Error occur while caching`, error);
                }
            },
        });
    };

    return { createComment, updateComment, deleteComment };
};

export default useComment;
