import styled from 'styled-components';

export const BigButton = styled.div`
    display: flex;
    width: 400px;
    height: 180px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #bfc4ca;
    cursor: pointer;
    background-color: ${(props) => props.color};
`;

export const NextButton = styled.div`
    display: flex;
    width: 240px;
    height: 64px;
    background-color: #eee;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 60px;
`;

export const ButtonFont = styled.span`
    font-size: 24px;
    font-weight: 400;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    color: #5f6871;
`;

export const CreateArticleContainer = styled.div`
    width: 840px;
    margin: 0 auto;
    padding-top: 100px;
    text-align: center;
`;

export const CreateArticleButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
`;

export const CreateArticleTitle = styled.p`
    font-size: 36px;
    font-weight: 600;
    color: #5f6871;
    margin-bottom: 20px;
`;
export const CreateArticleDesc = styled.p`
    font-size: 22px;
    color: #5f6871;
`;
