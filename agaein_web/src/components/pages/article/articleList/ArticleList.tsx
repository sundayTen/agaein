import { useRef, useState } from 'react';
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
import { InputRefProps } from 'components/molecules/Input/Input';
import SEO from 'components/molecules/SEO';

// TODO : 페이지네이션 클릭 시마다 2회씩 렌더링되는 이슈, lazy query말고 pagination으로 해결할 방법을 생각해야 함
const ArticleList = ({ history, match }: RouteComponentProps<ArticleListParams>) => {
    const { type } = match.params;
    const inputRef = useRef<InputRefProps>(null);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const goCreateArticlePage = () => {
        type === Board_Type.Review ? history.push('/createReview') : history.push(`/createArticle/step2/${type}`);
    };
    const setKeyword = () => {
        setSearchValue(inputRef.current?.getValue());
    };

    return (
        <>
            <SEO
                title={`${getTitle(type)} 게시글 리스트`}
                description="게시글 리스트"
                keywords="동물, 유기동물 찾기, 유기동물"
                url="https://www.agaein.com/articles/LFG"
            />
            <ArticleListContainer>
                <ArticleListHeaderContainer>
                    <Font label={getTitle(type)} fontType="h2" fontWeight="bold" />
                    <SearchBarContainer>
                        <Input
                            ref={inputRef}
                            style={{ minWidth: 840, minHeight: 46 }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setKeyword();
                                }
                            }}
                        />
                        <SearchButton onClick={setKeyword}>
                            <SearchText>Search</SearchText>
                            <StyledSearchIcon />
                        </SearchButton>
                    </SearchBarContainer>
                </ArticleListHeaderContainer>
                <ContentsList type={type} page={page} searchText={searchValue} />
                <ArticleListFooter>
                    <Button label="게시글 작성" buttonStyle="PAINTED" onClick={goCreateArticlePage} />
                    <Pagination active={page} setActive={setPage} />
                </ArticleListFooter>
            </ArticleListContainer>
        </>
    );
};

export default ArticleList;
