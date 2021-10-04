import React, { useEffect } from 'react';
import { CloseIcon, ModalInner, ModalOverlay, ModalWrapper } from './Modal.style';
interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    close: () => void;
}

const Modal = ({ open, children, close }: ModalProps) => {
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
                <ModalWrapper onClick={closeModal} open={open}>
                    <ModalInner>
                        <CloseIcon onClick={() => close()} />
                        {children}
                    </ModalInner>
                </ModalWrapper>
            </>
        );
    } else {
        return null;
    }
};

export default Modal;
