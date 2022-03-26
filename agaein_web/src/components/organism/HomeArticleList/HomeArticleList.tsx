import Font from 'components/molecules/Font';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { Article, Board_Type, useGetArticlesQuery, GetArticlesQueryVariables } from 'graphql/generated/generated';
import { getTitle } from 'utils/converter';
import { ArticleList, ButtonViewAll, ListContainer, ListHeader, ListItem, TitleBox } from './HomeArticleList.style';
import BestReviewList from '../BestReviewList/BestReviewList';
import { useContext, useEffect } from 'react';
import { BookmarkContext } from 'contexts';

interface HomeArticleListProps {
    boardType: Board_Type;
    setLoading: (loading: boolean) => void;
}

const HomeArticleList = ({ boardType, setLoading }: HomeArticleListProps) => {
    const { isBookmarked, setBookmark } = useContext(BookmarkContext);
    const isReviewType = () => {
        return boardType === Board_Type.Review;
    };

    const variables: GetArticlesQueryVariables = {
        boardType,
        limit: 6,
    };

    const { data, loading, error } = useGetArticlesQuery({
        variables,
        skip: isReviewType(),
    });
    useEffect(() => {
        setLoading(loading);
    }, [loading]);

    if (error || loading) return <></>;

    const articles = data?.articles.map((article) => article) as Article[];

    // TODO : utils함수로 빼던가 lodash를 쓰던가 해야할 듯 - Refactor 필요
    const isEmpty = (items?: Array<Article>) => {
        if (!items) return true;
        return items.length === 0;
    };

    const [firstChunk, secondChunk] = getTitle(boardType).split(' ');

    return (
        <ArticleList>
            <ListHeader>
                <TitleBox>
                    <Font label={firstChunk} fontType="h4" fontWeight="bold" status="ACTIVE" htmlElement="span" />
                    <Font label={secondChunk} fontType="h4" fontWeight="bold" htmlElement="span" />
                </TitleBox>
                <ButtonViewAll to={isReviewType() ? `reviews` : `articles/${boardType}`} type="button">
                    전체보기 &gt;
                </ButtonViewAll>
            </ListHeader>
            {isReviewType() ? (
                <BestReviewList />
            ) : (
                <ListContainer>
                    {isEmpty(articles) ? (
                        // TODO : 디자인 요청해서 컴포넌트로 만들어야 할 듯
                        <p>등록된 게시글이 없습니다</p>
                    ) : (
                        articles?.map((article) => {
                            return (
                                <ListItem key={article.id}>
                                    <PostItem
                                        item={article}
                                        bookmarked={isBookmarked(article.id)}
                                        setBookmark={() => setBookmark(article.id)}
                                    />
                                </ListItem>
                            );
                        })
                    )}
                </ListContainer>
            )}
        </ArticleList>
    );
};

export default HomeArticleList;
