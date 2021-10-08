import { Article, Board_Type, useGetArticleQuery } from 'graphql/generated/generated';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';

const ArticleDetail = ({ match, history }: RouteComponentProps<ArticleDetailParams>) => {
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
            boardType: Board_Type.Lfg,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    const { title, content } = data?.Article as Article;
    return (
        <>
            <p>{title}</p>
            <p>{content}</p>
        </>
    );
};

export default ArticleDetail;
