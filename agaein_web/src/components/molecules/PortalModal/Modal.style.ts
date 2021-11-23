import { XIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

const ModalContainer = styled.div`
    box-sizing: border-box;
    display: block;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    text-align: center;
    outline: 0;
`;

const ModalBackground = styled.div`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1001;
`;

const ModalTitleContainer = styled.div`
    padding-bottom: 19px;
    margin: 0 -24px 20px;
    border-bottom: 0.4px solid ${(props) => props.theme.light.lightGrey2};
`;

const ModalTitle = styled.span`
    margin: 0 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
`;

const ModalContent = styled.div`
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
    max-height: calc(100% - 100px);
    overflow-y: auto;
    max-width: 460px;
`;

const ChildrenContainer = styled.div`
    margin: 20px 0;
    padding-top: 20px;
`;
const ModalContentFont = styled.span`
    color: ${(props) => props.theme.light.DarkGrey2};
    font-size: 16px;
    font-weight: 400;
`;

const ModalButtonGroup = styled.div`
    text-align: center;
    margin-top: 40px;
    button + button {
        margin-left: 20px;
    }
`;

const MainContainer = styled.div`
    margin: 0 -24px;
    padding: 0 24px;
    max-height: 720px;
    overflow: auto;
`;

export const CloseIcon = styled(XIcon)`
    margin: 0 24px;
    width: 20px;
    float: right;
    cursor: pointer;
`;

export {
    ModalContainer,
    ModalBackground,
    ModalContent,
    ModalButtonGroup,
    ModalTitleContainer,
    ModalTitle,
    ChildrenContainer,
    MainContainer,
    ModalContentFont,
};
