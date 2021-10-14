import styled from 'styled-components';

export const ReviewItemContainer = styled.div`
    background-color: #fff;
    margin: 10px 10px 10px 10px;
    width: 290px;
    height: 280px;
    border-width: 2px;
    border: 2px solid #bfc4ca;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
`;

export const Title = styled.p`
    font-size: 14px;
    margin-bottom: 10px;
`;
export const Description = styled.p`
    font-size: 12px;
    color: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
`;
export const Avatar = styled.img`
    width: 100%;
    height: 160px;
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

export const ReviewInfoContainer = styled.div`
    margin: 10px 10px 10px 10px;
`;
