import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ArticleList = styled.div`
    margin-bottom: 60px;
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TitleBox = styled.div`
    display: flex;
    span + span {
        margin-left: 8px;
    }
`;

export const ButtonViewAll = styled(Link)`
    font-family: SsurroundAir;
    font-size: 14px;
    color: ${(props) => props.theme.light.DarkGrey2};
`;

export const ListContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 20px -20px 0;
`;

export const ListItem = styled.li`
    width: 180px;
    padding: 0 20px;

    a {
        display: block;
    }
`;
export const ReviewWrapper = styled.li`
    width: 290px;
    padding: 0 20px;
`;
