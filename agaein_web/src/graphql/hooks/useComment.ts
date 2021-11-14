import {
    MutationCreateCommentArgs,
    MutationDeleteCommentArgs,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} from 'graphql/generated/generated';

const useComment = () => {
    const [create] = useCreateCommentMutation();
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
                            // TODO : 아래 코드는 새로생긴 코드가 가장 아래에 생기는데, 대댓글일 경우 로직이 다름.
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

    return { createComment, deleteComment };
};

export default useComment;
