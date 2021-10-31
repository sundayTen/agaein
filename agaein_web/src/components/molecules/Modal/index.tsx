import React, { useEffect } from 'react';
import Button from '../Button';
import {
    ButtonContainer,
    CloseIcon,
    ModalInner,
    ModalOverlay,
    ModalWrapper,
    Title,
    TitleContainer,
    ChildrenContainer,
} from './Modal.style';
interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    close: () => void;
    title: string;
    btnName?: string;
    onBtn?: (value: boolean) => void;
}

const Modal = ({ open, children, close, title, btnName = '선택', onBtn }: ModalProps) => {
    useEffect(() => {
        if (open) {
            document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            };
        }
    }, [open]);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    if (open) {
        return (
            <>
                <ModalOverlay open={open} />
                <ModalWrapper onMouseDown={closeModal} open={open}>
                    <ModalInner>
                        <TitleContainer>
                            <Title>{title}</Title>
                            <CloseIcon onClick={() => close()} />
                        </TitleContainer>
                        <ChildrenContainer>{children}</ChildrenContainer>
                        <ButtonContainer>
                            {onBtn ? (
                                <Button
                                    buttonStyle="PAINTED"
                                    size="MEDIUM"
                                    label={btnName}
                                    onClick={() => {
                                        onBtn(true);
                                    }}
                                />
                            ) : null}
                        </ButtonContainer>
                    </ModalInner>
                </ModalWrapper>
            </>
        );
    } else {
        return null;
    }
};

export default Modal;
