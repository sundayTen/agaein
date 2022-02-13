import styled from 'styled-components';

interface ContentTagProps {
    type?: 'CRAWLING';
}

export const ItemBox = styled.div`
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    border: 1px solid ${(props) => props.theme.light.lightGrey2};

    &:hover {
        border-color: ${(props) => props.theme.light.primary};
    }
    margin-bottom: 20px;
`;

export const Thumb = styled.div`
    display: flex;
    align-items: center;
    height: 120px;
    background-color: #eee;
    overflow: hidden;
`;

export const Img = styled.img`
    width: 100%;
    min-height: 100%;
`;

export const InfoList = styled.ul`
    padding: 7px 12px;
`;

export const InfoItem = styled.li`
    display: table-row;
`;

export const InfoCategory = styled.em`
    display: table-cell;
    padding: 0 10px 2px 0;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    font-weight: 700;
    color: ${(props) => props.theme.light.DarkGrey2};
`;

export const InfoText = styled.span`
    display: table-cell;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
`;

export const BookMarkBox = styled.div`
    position: absolute;
    top: 6px;
    right: 6px;
`;

export const TagList = styled.div`
    display: flex;
    padding: 0 12px 8px;
`;

export const ContentTag = styled.div<ContentTagProps>`
    padding: 4px 10px;
    border-radius: 4px;
    vertical-align: middle;
    background-color: ${(props) =>
        props.type === 'CRAWLING' ? props.theme.light.white : props.theme.light.lightGrey2};
    display: inline-block;

    & + & {
        margin-left: 6px;
    }
`;
