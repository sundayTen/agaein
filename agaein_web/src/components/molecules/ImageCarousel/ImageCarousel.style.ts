import styled from 'styled-components';

export const CarouselContainer = styled.div`
    width: 720px;
    margin-right: 30px;

    @media screen and (max-width: 420px){
        width: 300px;
        margin-right: 0px;
        align-self: center;
        margin-bottom: 30px;
    }
`;

export const FocusedImageWrapper = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 720px;
    height: 548px;
    margin-right: 30px;
    border-radius: 10px;
    overflow: hidden;

    @media screen and (max-width: 420px){
        width: 300px;
        height: 200px;
    }
`;

export const FocusedImage = styled.img`
    width: 100%;
    min-height: 100%;
`;

export const CarouselList = styled.div`
    display: flex;
    padding-top: 20px;
    justify-content: center;
`;

interface SmallImgProps {
    active: boolean;
}

export const SmallImgWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 72px;
    height: 72px;
    border-radius: 4px;
    margin-right: 6px;
    overflow: hidden;
    cursor: pointer;
`;

export const SmallImg = styled.img<SmallImgProps>`
    width: 100%;
    min-height: 100%;
    opacity: ${(props) => (props.active ? 1 : 0.5)};
`;
