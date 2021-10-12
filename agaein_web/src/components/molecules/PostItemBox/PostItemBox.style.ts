import styled from 'styled-components';

export const ItemBox = styled.div`
    position: relative;
    border-radius: 10px;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    overflow: hidden;
    background-color: white;
    &:hover {
        border: ${(props) => '1px solid ' + props.theme.light.primary};
    }
    margin-bottom: 20px;
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

export const ContentTag = styled.div`
    padding: 4px 10px;
    margin: 0 0 10px 10px;
    border-radius: 4px;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    background-color: ${(props) => props.theme.light.lightGrey2};
    display: inline-block;
`;
