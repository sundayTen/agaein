import { useState } from 'react';
import Font from 'components/molecules/Font';
import {
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
import { Board_Type } from 'graphql/generated/generated';
import { Button, Input, Pagination } from 'components/molecules';
import { getTitle } from 'utils/converter';
import ContentsList from './ContentsList';

// TODO : 페이지네이션 클릭 시마다 2회씩 렌더링되는 이슈, lazy query말고 pagination으로 해결할 방법을 생각해야 함
const ArticleList = ({ history, match }: RouteComponentProps<ArticleListParams>) => {
    const { type } = match.params;
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const goCreateArticlePage = () => {
        type === Board_Type.Review ? history.push('/createReview') : history.push(`/createArticle/step2/${type}`);
    };

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
            <ContentsList type={type} page={page} searchText={searchInput} />
            <ArticleListFooter>
                <Button label="게시글 작성" buttonStyle="PAINTED" onClick={goCreateArticlePage} />
                <Pagination active={page} setActive={setPage} />
            </ArticleListFooter>
        </ArticleListContainer>
    );
};

export default ArticleList;
