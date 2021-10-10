import styled from 'styled-components';

export const ArticleDetailTitleContainer = styled.div`
    width: 620px;
    padding-top: 120px;
    margin: 0 auto;
`;
export const titleStyles = { marginLeft: 10, marginRight: 10 };
export const ArticleDetailDetailContainer = styled.div`
    background-color: ${(props) => props.theme.light.primary};
    width: 620px;
    height: 50px;
    margin: 25px auto 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ArticleDetailContentContainer = styled.div`
    margin: 20px auto;
    width: 620px;
`;
