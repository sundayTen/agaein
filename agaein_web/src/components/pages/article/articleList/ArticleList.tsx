import { useState } from 'react';
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
import { Article, Board_Type, useGetArticlesQuery } from 'graphql/generated/generated';
import Button from 'components/molecules/Button';
import Pagination from 'components/molecules/Pagination';
import PostItemBox from 'components/molecules/PostItemBox';
import ReviewItem from 'components/molecules/ReviewItem';
import useBookmark from 'hooks/useBookmark';
import { getTitle } from 'utils/converter';
import { ITEM_PER_PAGE, NUMBER_PER_ROW } from '.';
import Input from 'components/molecules/Input';

const ArticleList = ({ history, match }: RouteComponentProps<ArticleListParams>) => {
    const { type } = match.params;
    const { isBookmarked, setBookmark } = useBookmark();
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const { data, loading, error, fetchMore } = useGetArticlesQuery({
        variables: {
            boardType: type,
            offset: 0,
            limit: ITEM_PER_PAGE,
        },
    });
    if (loading) {
        return <Font label="잠시만 기다려주세요" fontType="h2" />;
    }
    if (error) {
        return <Font label="에러가 발생했습니다" fontType="h2" />;
    }

    const onPressPage = (value: number) => {
        fetchMore({
            variables: {
                offset: page * ITEM_PER_PAGE,
            },
        }).then((data) => console.log(data.data.articles));

        setPage(value);
    };

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
                    onClick={() => history.push('/createArticle/step1')}
                />
                <Pagination active={page} setActive={onPressPage} />
            </ArticleListFooter>
        </ArticleListContainer>
    );
};

export default ArticleList;
