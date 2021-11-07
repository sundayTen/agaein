import styled from 'styled-components';

export const HorizontalContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    padding-top: 30px;
`;

export const ArticleDetailContainer = styled.div`
    width: 540px;
    background-color: white;
    border-radius: 4px;
    padding: 30px;
    margin: 0 auto;
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
    margin: 20px auto;
    width: 620px;
    overflow: hidden;
    width: auto;
`;
export const ArticleInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ArticleMapContainer = styled.div`
    border-top: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    padding: 30px;
    margin: 30px 0;
`;
