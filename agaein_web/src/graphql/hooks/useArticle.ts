import {
    Finding_Status,
    useDoneMutation,
    MutationDoneArgs,
    ArticleFragmentFragmentDoc,
    Board_Type,
} from './../generated/generated';
import { useApolloClient } from '@apollo/client';
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
    const [done] = useDoneMutation();
    const client = useApolloClient();

    const readArticle = (id?: string | undefined) => {
        client.cache.modify({
            id: `Article:${id}`,
            fields: {
                view: (prevViewCount) => prevViewCount + 1,
            },
        });
    };
    const updateArticleStatus = (args: MutationDoneArgs) => {
        const { articleId } = args;
        let articleType: Board_Type.Lfg | Board_Type.Lfp | null = null;
        let detailId: string | null = null;
        try {
            const Article = client.readFragment({
                id: `Article:${articleId}`,
                fragment: ArticleFragmentFragmentDoc,
                fragmentName: 'ArticleFragment',
            });
            articleType = Article.articleDetail.__typename;
            detailId = Article.articleDetail.id;
        } catch (error) {
            console.error(error);
        }

        done({
            variables: args,
            update: (cache) => {
                try {
                    cache.modify({
                        id: `${articleType}:${detailId}`,
                        fields: {
                            status: () => Finding_Status.Done,
                        },
                    });
                } catch (error) {
                    throw new Error('캐싱 도중 에러 발생');
                }
            },
        });
    };

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

    return { createArticle, updateArticle, deleteArticle, readArticle, updateArticleStatus };
};
export default useArticle;
