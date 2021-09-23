import styled from 'styled-components';

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 140px;
`;

export const HeaderTitle = styled.strong`
    font-size: 28px;
    line-height: 34px;
    color: #5f6871;
`;

export const ButtonViewAll = styled.button`
    font-size: 18px;
    color: #5f6871;
    cursor: pointer;
`;

export const ListContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 20px -20px;
`;

export const ListItem = styled.li`
    width: calc(100% / 6);
    padding: 10px 20px;
    box-sizing: border-box;
`;
