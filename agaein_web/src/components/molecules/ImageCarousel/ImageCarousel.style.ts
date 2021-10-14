import styled from 'styled-components';

export const CarouselContainer = styled.div`
    width: 720px;
    margin-right: 30px;
`;

// TODO : Image의 크기가 하드코딩되어있으면 사진에 따라 가로세로 비율이 달라 찌그러져 보일 수 있음.
export const FocusedImage = styled.img`
    width: 720px;
    height: 548px;
    border-radius: 10px;
`;
export const CarouselList = styled.div`
    display: flex;
    padding-top: 20px;
    justify-content: center;
`;

interface SmallImgProps {
    active: boolean;
}

export const SmallImg = styled.img<SmallImgProps>`
    width: 72px;
    height: 72px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 6px;
    opacity: ${(props) => (props.active ? 1 : 0.5)};
`;
