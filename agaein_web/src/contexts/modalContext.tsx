import { createContext, useState, useEffect } from 'react';
import ModalPortal from 'components/molecules/PortalModal';
import { useHistory } from 'react-router';

export interface ModalInfoProps {
    title?: string;
    content?: string;
    children?: JSX.Element | null;
    cancelButtonLabel?: string;
    confirmButtonLabel?: string;
    cancelButtonPressed?: () => void;
    confirmButtonPressed?: () => void;
}
interface ModalContextProps {
    close: () => void;
    show: (info: ModalInfoProps) => void;
    update: (info: ModalInfoProps) => void;
}
const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

type ModalProviderContext = {
    children: JSX.Element | JSX.Element[] | undefined;
};

const ModalProvider = ({ children }: ModalProviderContext): JSX.Element => {
    const [modalContent, setModalContent] = useState<ModalInfoProps | null>(null);
    const history = useHistory();
    useEffect(() => {
        return history.listen(() => {
            if (history.action === 'POP') {
                close();
            }
        });
    }, [history]);

    const close = function closeModal() {
        setModalContent(null);
    };

    const show = function setModalInfo(info: ModalInfoProps) {
        setModalContent(info);
    };
    const update = (info: ModalInfoProps) => {
        setModalContent({ ...modalContent, ...info });
    };
    return (
        <ModalContext.Provider value={{ close, show, update }}>
            {children}
            <ModalPortal modalContent={modalContent} />
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalProvider };
