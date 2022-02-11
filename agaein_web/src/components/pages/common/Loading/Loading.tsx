import { Font } from 'components/molecules';
import { ModalContext } from 'contexts';
import { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    LoadingContainer,
    LoadingIcons,
    LoadingInnerContainer,
    Loading1Icon,
    Loading2Icon,
    Loading3Icon,
    Loading4Icon,
} from './Loading.style';

const Loading = () => {
    const element = document.getElementById('loading');
    const { loading } = useContext(ModalContext);
    const [step, setStep] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev === 4 ? 1 : prev + 1));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const getImage = () => {
        switch (step) {
            case 1:
                return <Loading1Icon />;
            case 2:
                return <Loading2Icon />;
            case 3:
                return <Loading3Icon />;
            case 4:
                return <Loading4Icon />;
            default:
                return <Loading1Icon />;
        }
    };
    if (element === null || !loading) return <></>;
    return ReactDOM.createPortal(
        <LoadingContainer>
            <LoadingInnerContainer>
                <LoadingIcons>{getImage()}</LoadingIcons>
                <Font fontType="h3" label="잠시만 기다려주세요..." />
            </LoadingInnerContainer>
        </LoadingContainer>,
        element,
    );
};

export default Loading;
