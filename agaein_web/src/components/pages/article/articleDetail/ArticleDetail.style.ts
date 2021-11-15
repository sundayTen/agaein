import styled from 'styled-components';

export const HorizontalContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    padding-top: 30px;
`;

export const ArticleDetailContainer = styled.div`
    width: 540px;
    background-color: ${(props) => props.theme.light.white};
    border-radius: 4px;
    margin: 0 auto;
`;

export const ContainerTop = styled.div`
    padding: 30px 30px 20px;
    border-bottom: 1px solid ${(props) => props.theme.light.lightGrey2};
`;

export const TitleAndBookMarkContainer = styled.div`
    display: flex;
    position: relative;
`;
export const BookmarkContainer = styled.div`
    position: absolute;
    top: 5;
    right: 5;
`;

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
    margin-top: 16px;
`;

export const ArticleInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`;

export const ArticleMapContainer = styled.div`
    padding: 20px 30px 30px;
`;
