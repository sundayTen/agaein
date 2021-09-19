import styled from 'styled-components';

export const ItemBox = styled.div`
    border-radius: 20px;
    border: 1px solid #BFC4CA;
    overflow: hidden;
`;

export const ItemLink = styled.a`
    display: block;
`;

export const Thumb = styled.div`
    height: 120px;
    background-color: #eee;
    overflow: hidden;
`;

export const Img = styled.img`
    width: 100%;
`;

export const InfoList = styled.ul`
    padding: 10px;
`;

export const InfoItem = styled.li`
    display: table-row;
    padding: 2px 12px;
`;

export const InfoCategory = styled.em`
    display: table-cell;
    padding: 0 10px;
    font-size: 12px;
    color: #5F6871;
`;

export const InfoText = styled.span`
    display: table-cell;
    font-size: 12px;
    color: #BFC4CA;
`;
