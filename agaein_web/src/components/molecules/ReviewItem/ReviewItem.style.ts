import styled from 'styled-components';

export const ReviewItemContainer = styled.div`
    width: 290px;
    border-width: 2px;
    border: 1px solid ${(props) => props.theme.light.lightGrey2};
    border-radius: 10px;
    background-color: ${(props) => props.theme.light.white};
    cursor: pointer;
    overflow: hidden;

    &:hover {
        border: 1px solid ${(props) => props.theme.light.primary};
    }
`;

export const Title = styled.p`
    font-size: 14px;
    margin-bottom: 10px;
`;
export const Description = styled.p`
    font-size: 12px;
    color: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
`;

export const ReviewerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 10px 5px 10px;
`;

export const ReviewerName = styled.p`
    font-size: 12px;
    color: #5f6871;
`;
export const CommentCount = styled.p`
    font-size: 12px;
    color: #5f6871;
`;

export const ReviewImageContainer = styled.div`
    display: flex;
    align-items: center;
    height: 140px;
    overflow: hidden;
`;

export const ReviewImage = styled.img`
    width: 100%;
    min-height: 100%;
`;

export const ReviewInfoContainer = styled.div`
    padding: 9px 12px 10px;
    height: 98px;
    box-sizing: border-box;
`;
