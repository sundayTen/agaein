import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import ReviewItem from 'components/molecules/ReviewItem';
import { Article, Board_Type, useGetArticlesQuery } from 'graphql/generated/generated';
import { ArticleList, ButtonViewAll, HeaderTitle, ListContainer, ListHeader, ListItem } from './HomeArticleList.style';

interface HomeArticleListProps {
    boardType: Board_Type;
}

const HomeArticleList = ({ boardType }: HomeArticleListProps) => {
    const { data, loading, error } = useGetArticlesQuery({
        variables: {
            boardType,
        },
    });

    const getTitle = (boardType: Board_Type) => {
        switch (boardType) {
            case Board_Type.Lfg:
                return '실종동물 찾습니다';
            case Board_Type.Lfp:
                return '주인을 찾습니다';
            case Board_Type.Review:
                return '찾은 후기';
            default:
                return '잘못된 데이터';
        }
    };
    if (loading) return <p>Loading</p>;
    if (error) return <p>{`Error : ${error}`}</p>;

    const articles = data?.Articles.map((article) => article);

    return (
        <ArticleList>
            <ListHeader>
                <HeaderTitle>{getTitle(boardType)}</HeaderTitle>
                <ButtonViewAll type="button">전체보기 &gt;</ButtonViewAll>
            </ListHeader>
            <ListContainer>
                {articles?.length === 0 ? (
                    // TODO : 디자인 요청해서 컴포넌트로 만들어야 할 듯
                    <p>등록된 게시글이 없습니다</p>
                ) : (
                    articles?.map((article) => {
                        return (
                            <ListItem key={article?.id}>
                                {boardType === Board_Type.Review ? (
                                    <ReviewItem />
                                ) : (
                                    <PostItem item={article as Article} />
                                )}
                            </ListItem>
                        );
                    })
                )}
            </ListContainer>
        </ArticleList>
    );
};

export default HomeArticleList;
