import styled from "styled-components";
interface InfoWindowProps {
    type?: string;
    roadAddress?: boolean;
}
export const Category = styled.div`
    position: absolute;
    width: 258px;
    line-height: 36px;
    height: 36px;
    bottom: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    z-index: 1;
    text-align: center;
`;
export const Img = styled.img`
    vertical-align: middle;
    margin-left: 10px;
`;

export const Text = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    vertical-align: middle;
    color: #333333;
    margin-right: 10px;
`;

export const MapContainer = styled.div`
    position: relative;
`;

export const InfoWindow = styled.div<InfoWindowProps>`
    position: relative;
    left: -50%;
    bottom: ${(props) => props.type === "miss" ? (props.roadAddress ? `90px`: `75px`) : (props.roadAddress ? `80px` : `70px`)};
    transform: ${(props) => props.type === "miss" ? `translateX(50%)` : `translateX(1%)`};
    padding: 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.2);
    border-radius: 4px;

    font-family: NanumSquareRound;
    font-style: normal;
    font-size: 14px;
    line-height: 22px;

    &:after {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    &:after {
        border-color: rgba(255, 255, 255, 0);
        border-top-color: #ffffff;
        border-width: 10px;
        margin-left: -10px;
    }

`;
