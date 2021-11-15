import { XIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

type styledProps = {
    open: boolean;
};

export const TitleContainer = styled.div`
    padding-bottom: 19px;
    margin: 0 -24px;
    border-bottom: 0.4px solid ${(props) => props.theme.light.lightGrey2};
`;

export const ButtonContainer = styled.div`
    text-align: center;
`;

export const ChildrenContainer = styled.div`
    margin: 20px 0;
`;

export const MainContainer = styled.div`
    margin: 0 -24px;
    padding: 0 24px;
    max-height: 720px;
    overflow: auto;
`;

export const Title = styled.span`
    margin: 0 24px;
    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
`;

export const CloseIcon = styled(XIcon)`
    margin: 0 24px;
    width: 20px;
    float: right;
    cursor: pointer;
`;
export const ModalOverlay = styled.div<styledProps>`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

export const ModalWrapper = styled.div<styledProps>`
    box-sizing: border-box;
    display: block;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    text-align: center;
    outline: 0;
`;

export const ModalInner = styled.div`
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.light.white};
    border-radius: 10px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 21px 24px;
    text-align: left;
    height: calc(100% - 100px);
    overflow-y: auto;
`;
