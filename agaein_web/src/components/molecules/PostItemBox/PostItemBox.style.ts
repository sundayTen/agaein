import styled from 'styled-components';

export const ItemBox = styled.div`
    border-radius: 20px;
    border: 1px solid #bfc4ca;
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
    margin-bottom: 6px;
`;

export const InfoCategory = styled.em`
    display: table-cell;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.light.primary};
    font-family: NanumSquareRound;
`;

export const InfoText = styled.span`
    display: table-cell;
    font-size: 12px;
`;
