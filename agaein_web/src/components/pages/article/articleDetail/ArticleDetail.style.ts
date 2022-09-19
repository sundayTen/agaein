import { DotsHorizontalIcon, ViewListIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

export const HorizontalContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    padding-top: 30px;

    @media screen and (max-width: 420px){
        flex-direction: column;
    }
`;

export const ArticleDetailContainer = styled.div`
    width: 540px;
    background-color: ${(props) => props.theme.light.white};
    border-radius: 4px;
    margin: 0 auto;

    @media screen and (max-width: 420px){
        width: 340px;
    }
`;

export const ContainerTop = styled.div`
    padding: 30px 30px 20px;
    border-bottom: 1px solid ${(props) => props.theme.light.lightGrey2};
`;

export const ArticleDetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledDotIcon = styled(DotsHorizontalIcon)`
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.light.DarkGrey2};
    cursor: pointer;
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
export const InfoHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
`;
export const InfoHeaderFont = styled.span<{ panted?: boolean }>`
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    color: ${(props) => (props.panted ? props.theme.light.primary : props.theme.light.DarkGrey2)};
`;

export const ArticleSelectContainer = styled.div`
    display: inline-block;
    position: relative;
`;

export const WitnessButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`

export const WitnessListButton = styled.button`
    background: ${(props) => props.theme.light.primary};
    border-radius: 6px;
    width: 10%;
    padding: 10px 10px;

    @media screen and (max-width: 420px){
        width: 15%;
    }
    
`
export const ListIcon = styled(ViewListIcon)`
    vertical-align: middle;
    color: #fff;
    width: 25px;
    height: 25px;
`