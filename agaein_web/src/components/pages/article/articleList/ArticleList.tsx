import { useCallback, useEffect, useState } from 'react';
import Font from 'components/molecules/Font';
import {
    ArticleGridContainer,
    ArticleItem,
    ArticleListContainer,
    ArticleListFooter,
    ArticleListHeaderContainer,
    SearchBarContainer,
    SearchButton,
    SearchText,
    StyledSearchIcon,
} from './ArticleList.style';
import { RouteComponentProps } from 'react-router';
import { ArticleListParams } from 'router/params';
import { Article, Board_Type, useGetArticlesLazyQuery } from 'graphql/generated/generated';
import Button from 'components/molecules/Button';
import Pagination from 'components/molecules/Pagination';
import PostItemBox from 'components/molecules/PostItemBox';
import ReviewItem from 'components/molecules/ReviewItem';
import useBookmark from 'hooks/useBookmark';
import { getTitle } from 'utils/converter';
import { ITEM_PER_PAGE } from '.';
import Input from 'components/molecules/Input';

// TODO : 페이지네이션 클릭 시마다 2회씩 렌더링되는 이슈, lazy query말고 pagination으로 해결할 방법을 생각해야 함
const ArticleList = ({ history, match }: RouteComponentProps<ArticleListParams>) => {
    const { type } = match.params;
    const { isBookmarked, setBookmark } = useBookmark();
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [get, { data, loading, error }] = useGetArticlesLazyQuery();

    const getArticles = useCallback(() => {
        get({
            variables: {
                boardType: type,
                limit: ITEM_PER_PAGE,
                offset: (page - 1) * ITEM_PER_PAGE ?? 0,
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
        <ArticleListContainer>
            <ArticleListHeaderContainer>
                <Font label={getTitle(type)} fontType="h2" fontWeight="bold" />
                <SearchBarContainer>
                    <Input
                        value={searchInput ?? ''}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ minWidth: 840, minHeight: 46 }}
                    />
                    <SearchButton>
                        <SearchText>Search</SearchText>
                        <StyledSearchIcon />
                    </SearchButton>
                </SearchBarContainer>
            </ArticleListHeaderContainer>
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
            <ArticleListFooter>
                <Button
                    label="게시글 작성"
                    buttonStyle="PAINTED"
                    onClick={() => history.push(`/createArticle/step2/${type}`)}
                />
                <Pagination active={page} setActive={setPage} />
            </ArticleListFooter>
        </ArticleListContainer>
    );
};

export default ArticleList;
