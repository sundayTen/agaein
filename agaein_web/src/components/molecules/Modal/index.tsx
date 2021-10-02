import React, { useEffect } from 'react';
import { ModalInner, ModalOverlay, ModalWrapper } from './Modal.style';
import { XIcon } from '@heroicons/react/solid';

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    close: () => void;
}

const Modal = ({ open, children, close }: ModalProps) => {
    useEffect(() => {
        if (open === true) {
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

    const modelClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    if (open === true) {
        return (
            <>
                <ModalOverlay open={open} />
                <ModalWrapper onClick={modelClose} open={open}>
                    <ModalInner>
                        <XIcon
                            style={{ width: 20, float: 'right', marginTop: -25, marginRight: -5, cursor: 'pointer' }}
                            onClick={() => close()}
                        />
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
