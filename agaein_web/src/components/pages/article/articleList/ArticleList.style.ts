import { Board_Type } from './../../../../graphql/generated/generated';
import styled from 'styled-components';
import { SearchIcon } from '@heroicons/react/outline';

const ArticleListContainer = styled.div`
    margin: 0 auto;
    padding: 30px 0;
`;
const ArticleListHeaderContainer = styled.div`
    text-align: center;
    margin-bottom: 80px;
`;
const ArticleListFooter = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
`;
const SearchBarContainer = styled.div`
    display: flex;
    position: relative;
    margin: 16px auto;
    width: 840px;
    height: 46px;
    align-items: center;
`;
const SearchButton = styled.button`
    display: flex;
    position: absolute;
    right: 3px;
    top: 3px;
    width: 140px;
    height: 40px;
    background-color: ${(props) => props.theme.light.primary};
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`;
const StyledSearchIcon = styled(SearchIcon)`
    color: white;
    width: 16px;
    height: 16px;
`;

const ArticleGridContainer = styled.ul`
    min-width: 1320px;
    display: inline-block;
    overflow: hidden;
`;

const SearchText = styled.span`
    color: ${(props) => props.theme.light.white};
    font-size: 16px;
`;

interface ArticleItemProps {
    type: Board_Type;
}
const ArticleItem = styled.li<ArticleItemProps>`
    display: inline-block;
    width: ${(props) => (props.type === Board_Type.Review ? '290px' : '180px')};
    padding: 0 40px 0 0;
`;

export {
    ArticleListContainer,
    ArticleListHeaderContainer,
    ArticleGridContainer,
    ArticleListFooter,
    ArticleItem,
    SearchBarContainer,
    SearchButton,
    StyledSearchIcon,
    SearchText,
};
