import Button from 'components/molecules/Button';
import styled from 'styled-components';
interface ToggleButtonProps {
    click: boolean;
}
export const ImgToggleButton = styled.button<ToggleButtonProps>`
    width: 120px;
    height: 30px;
    border: 1px solid ${(props) => props.click ? `#EFA03D` : `#C4C4C4`};
    float: right;  
    margin-bottom: 10px;
    border-radius: 0px 4px 4px 0px;
    background: ${(props) => props.click ? `rgba(239, 160, 61, 0.1)` : `#fff`};

    font-family: NanumSquareRound;
    color: ${(props) => props.click ? `#EFA03D` : `#505050`};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
`;
export const MapToggleButton = styled.button<ToggleButtonProps>`
    width: 120px;
    height: 30px;
    float: right;
    border: 1px solid ${(props) => props.click ? `#EFA03D` : `#C4C4C4`};
    margin-bottom: 10px;
    border-radius: 4px 0px 0px 4px;
    background: ${(props) => props.click ? `rgba(239, 160, 61, 0.1)` : `#fff`};
    
    font-family: NanumSquareRound;
    color: ${(props) => props.click ? `#EFA03D` : `#505050`};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;

`;