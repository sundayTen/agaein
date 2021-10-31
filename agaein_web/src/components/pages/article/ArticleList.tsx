import Font from 'components/molecules/Font';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { RouteComponentProps } from 'react-router-dom';
import {
    ArticleListDiv,
    ButtonContainer,
    ListContainer,
    ListHeader,
    ListItem,
    PostingButton,
} from './ArticleList.style';
import SearchBar from 'components/molecules/SearchBar';
import Pagination from 'components/molecules/Pagination';
import useBookmark from 'hooks/useBookmark';
import { Article, Board_Type, useGetArticlesQuery } from 'graphql/generated/generated';
import { Fragment } from 'react';

const ArticleList = (props: RouteComponentProps) => {
    const { data, loading, error } = useGetArticlesQuery({
        variables: {
            boardType: Board_Type.Lfg,
        },
    });
    const { isBookmarked, setBookmark } = useBookmark();
    if (loading) return <></>;
    if (error) {
        return <></>;
    }
    return (
        <Fragment>
            <ArticleListDiv>
                <ListHeader>
                    <Font label={'실종견 리스트'} fontType="h3" fontWeight="bold" />
                </ListHeader>
                <SearchBar />
                <ListContainer>
                    {data?.articles?.map((article) => {
                        if (article === null) return <></>;
                        return (
                            <ListItem key={article?.id}>
                                <PostItem
                                    item={article as Article}
                                    bookmarked={isBookmarked(article.id)}
                                    setBookmark={() => setBookmark(article.id)}
                                />
                            </ListItem>
                        );
                    })}
                </ListContainer>

                <ButtonContainer to={'/createArticle/step1'}>
                    <PostingButton label="게시글 작성" onClick={() => {}} />
                </ButtonContainer>

                <Pagination />
            </ArticleListDiv>
        </Fragment>
    );
};

export default ArticleList;
