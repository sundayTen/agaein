import { useCallback, useEffect } from 'react';
import { Font, PostItemBox, ReviewItem } from 'components/molecules';
import { Article, Board_Type, useGetArticlesLazyQuery } from 'graphql/generated/generated';
import useBookmark from 'hooks/useBookmark';
import { ITEM_PER_PAGE } from '.';
import { ArticleGridContainer, ArticleItem } from './ArticleList.style';
import Loading from 'components/pages/common/Loading';

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

    if (error) {
        return <Font label="에러가 발생했습니다" fontType="h2" />;
    }
    const articles = data?.articles as Article[];
    return (
        <ArticleGridContainer>
            {articles.map((item) => (
                <ArticleItem type={type} key={item.id}>
                    {type === Board_Type.Review ? (
                        <ReviewItem item={item} />
                    ) : (
                        <PostItemBox
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
