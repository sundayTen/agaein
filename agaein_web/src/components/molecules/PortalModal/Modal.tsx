import { ModalContext, ModalInfoProps } from 'contexts/modalContext';
import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '..';
import {
    CloseIcon,
    MainContainer,
    ModalBackground,
    ModalContainer,
    ModalContent,
    ModalContentFont,
    ModalTitle,
    ModalTitleContainer,
    ModalButtonGroup,
} from './Modal.style';

interface ModalProps {
    modalContent?: ModalInfoProps | null;
}
const ModalPortal = (props: ModalProps) => {
    const { modalContent = null } = props;
    const { close } = useContext(ModalContext);
    const element = document.getElementById('modal');
    if (modalContent === null) return <></>;
    const {
        title,
        content,
        children,
        cancelButtonLabel,
        confirmButtonLabel,
        cancelButtonPressed,
        confirmButtonPressed,
    } = modalContent;
    if (element === null) return <></>;
    return ReactDOM.createPortal(
        <Fragment>
            <ModalBackground />
            <ModalContainer>
                <ModalContent>
                    <ModalTitleContainer>
                        <ModalTitle>{title}</ModalTitle>
                        <CloseIcon onClick={close} />
                    </ModalTitleContainer>
                    <MainContainer>
                        {content && <ModalContentFont>{content}</ModalContentFont>}
                        {children}
                        <ModalButtonGroup>
                            {cancelButtonLabel && (
                                <Button
                                    buttonStyle="BLACK"
                                    size="MEDIUM"
                                    label={cancelButtonLabel}
                                    onClick={() => {
                                        cancelButtonPressed && cancelButtonPressed();
                                    }}
                                />
                            )}
                            {confirmButtonLabel && (
                                <Button
                                    buttonStyle="PAINTED"
                                    size="MEDIUM"
                                    label={confirmButtonLabel}
                                    onClick={() => {
                                        confirmButtonPressed && confirmButtonPressed();
                                    }}
                                />
                            )}
                        </ModalButtonGroup>
                    </MainContainer>
                </ModalContent>
            </ModalContainer>
        </Fragment>,
        element,
    );
};

export default ModalPortal;
