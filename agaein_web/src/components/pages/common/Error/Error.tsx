import { Button, Font } from 'components/molecules';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface ErrorProps {
    error: Error;

    resetErrorBoundary: () => void;
}

const Error = ({ error, resetErrorBoundary }: ErrorProps) => {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };

    return (
        <ErrorContainer>
            <Font fontType="h2" label={'문제가 발생했어요.'} />
            <Buttons>
                <Button label="뒤로가기" onClick={goBack} />
                <Button label="리프레시" onClick={resetErrorBoundary} />
            </Buttons>
        </ErrorContainer>
    );
};

export default Error;

const ErrorContainer = styled.div`
    margin: 100px auto;
    text-align: center;
`;

const Buttons = styled.div`
    margin: 100px;
    button + button {
        margin-left: 10px;
    }
`;
