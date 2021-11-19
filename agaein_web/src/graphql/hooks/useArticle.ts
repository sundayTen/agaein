import {
    GetArticlesDocument,
    MutationCreateArticleArgs,
    MutationDeleteArticleArgs,
    MutationUpdateArticleArgs,
    useCreateArticleMutation,
    useDeleteArticleMutation,
    useUpdateArticleMutation,
} from 'graphql/generated/generated';

const useArticle = () => {
    const [create] = useCreateArticleMutation();
    const [edit] = useUpdateArticleMutation();
    const [drop] = useDeleteArticleMutation();

    const createArticle = (args: MutationCreateArticleArgs) => {
        const { boardType, files, articleDetail } = args;
        return create({
            variables: {
                boardType,
                files,
                articleDetail,
            },
            refetchQueries: [{ query: GetArticlesDocument, variables: { boardType, limit: 6 } }],
        });
    };

    const updateArticle = (args: MutationUpdateArticleArgs) => {
        const { id, articleDetail, files } = args;
        edit({
            variables: {
                id,
                articleDetail,
                files,
            },
            update: (cache, { data }) => {},
        });
    };

    const deleteArticle = (args: MutationDeleteArticleArgs) => {
        const { id, password } = args;
        drop({
            variables: {
                id,
                password,
            },
            update: (cache) => {
                try {
                    const normalizedId = `Article:${id}`;
                    cache.evict({ id: normalizedId });
                    cache.gc();
                } catch (error) {
                    console.error(`Error occur : ${error}`);
                }
            },
            refetchQueries: [{ query: GetArticlesDocument }],
        });
    };

    return { createArticle, updateArticle, deleteArticle };
};
export default useArticle;
