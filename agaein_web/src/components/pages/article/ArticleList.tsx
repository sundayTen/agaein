import Font from 'components/molecules/Font';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
    ArticleListDiv,
    ButtonContainer,
    ListContainer,
    ListHeader,
    ListItem,
    PostingButton,
} from './ArticleList.style';
import { testDate } from './testData';
import { Article } from 'graphql/generated/generated';
import SearchBar from 'components/molecules/SearchBar';
import Pagination from 'components/molecules/Pagination';
import useBookmark from 'hooks/useBookmark';

const ArticleList = ({ match, history }: RouteComponentProps) => {
    const articles = testDate.data?.Articles.map((article) => article) as Article[];
    const { isBookmarked, setBookmark } = useBookmark();
    return (
        <div>
            <ArticleListDiv>
                <ListHeader>
                    <Font label={'실종견 리스트'} fontType="h3" fontWeight="bold" />
                </ListHeader>
                <SearchBar />
                <ListContainer>
                    {articles?.map((article: Article) => {
                        return (
                            <ListItem key={article?.id}>
                                <PostItem
                                    item={article}
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
        </div>
    );
};

export default ArticleList;
