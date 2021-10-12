import styled from 'styled-components';

export const ArticleList = styled.div`
    margin-top: 140px;
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TitleBox = styled.div`
    display: flex;
    span + span {
        margin-left: 10px;
    }
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
