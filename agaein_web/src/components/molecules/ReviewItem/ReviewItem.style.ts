import styled from 'styled-components';

export const ReviewItemContainer = styled.div`
    background-color: #fff;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px 10px 10px;
    width: 150px;
    height: 200px;
    border-width: 2px;
    border: 2px solid #bfc4ca;
    border-radius: 10px;
    cursor: pointer;
`;

export const Title = styled.p`
    font-size: 14px;
`;
export const Description = styled.p`
    font-size: 12px;
    color: #bfc4ca;
`;
export const Avatar = styled.img`
    width: 150px;
    height: 100px;
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
