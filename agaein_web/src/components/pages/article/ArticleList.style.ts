import Button from 'components/molecules/Button';
import { StyledButton } from 'components/molecules/Button/Button.style';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ArticleListDiv = styled.div`
    margin-top: 140px;
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ButtonViewAll = styled.button`
    font-size: 18px;
    color: #5f6871;
    cursor: pointer;
    font-family: SsurroundAir;
`;

export const ListContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 20px -20px 0;
`;

export const ListItem = styled.li`
    width: 180px;
    padding: 0 20px;
`;
export const ButtonContainer = styled(Link)`
    display: flex;
`;
export const PostingButton = styled(Button)`
    margin-left: auto;
`;
