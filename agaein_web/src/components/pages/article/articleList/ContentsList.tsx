import { useCallback, useEffect } from 'react';
import { Font, PostItemBox, ReviewItem } from 'components/molecules';
import { Article, Board_Type, useGetArticlesLazyQuery } from 'graphql/generated/generated';
import useBookmark from 'hooks/useBookmark';
import { ITEM_PER_PAGE } from '.';
import { ArticleGridContainer, ArticleItem } from './ArticleList.style';

interface ListProps {
    type: Board_Type;
    page: number;
    searchText?: string;
}

const ContentsList = (props: ListProps) => {
    const { type, page = 1, searchText = '' } = props;
    const { isBookmarked, setBookmark } = useBookmark();
    const [get, { data, loading, error }] = useGetArticlesLazyQuery();

    const getArticles = useCallback(() => {
        get({
            variables: {
                boardType: type,
                limit: ITEM_PER_PAGE,
                offset: (page - 1) * ITEM_PER_PAGE,
            },
        });
    }, [page]);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    if (loading || !data) {
        return <Font label="잠시만 기다려주세요" fontType="h2" />;
    }
    if (error) {
        return <Font label="에러가 발생했습니다" fontType="h2" />;
    }
    const articles = data?.articles as Article[];
    return (
        <ArticleGridContainer>
            {articles.map((item) => (
                <ArticleItem type={type}>
                    {type === Board_Type.Review ? (
                        <ReviewItem key={item.id} item={item} />
                    ) : (
                        <PostItemBox
                            key={item.id}
                            item={item}
                            bookmarked={isBookmarked(item.id)}
                            setBookmark={() => setBookmark(item.id)}
                        />
                    )}
                </ArticleItem>
            ))}
        </ArticleGridContainer>
    );
};

export default ContentsList;
