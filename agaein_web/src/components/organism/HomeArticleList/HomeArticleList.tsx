import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { Board_Type, useGetArticlesQuery } from 'graphql/generated/generated';
import { ButtonViewAll, HeaderTitle, ListHeader } from './HomeArticleList.style';

const HomeArticleList = (boardType: Board_Type) => {
    const { data, loading, error } = useGetArticlesQuery({
        variables: {
            boardType,
        },
    });
    const getTitle = (boardType: Board_Type) => {
        switch (boardType) {
            case Board_Type.Lfg:
                return '찾아주세요';
            case Board_Type.Lfp:
                return '찾았어요';
            case 'REVIEW':
                return '찾은 후기';
            default:
                return '잘못된 데이터';
        }
    };
    if (loading) return <p>Loading</p>;
    if (error) return <p>{`Error : ${error}`}</p>;
    const articles = data?.Articles.map((article) => article);

    return (
        <>
            <ListHeader>
                <HeaderTitle>{getTitle(boardType)}</HeaderTitle>
                <ButtonViewAll type="button">전체보기 &gt;</ButtonViewAll>
            </ListHeader>
            // TODO : articles가 없으면 Empty Component (등록된 게시글이 없어요! 가 보이도록 하기)
            {articles?.map((article) => {
                return <PostItem item={article} />;
            })}
        </>
    );
};

export default HomeArticleList;
