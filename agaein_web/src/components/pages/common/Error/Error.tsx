import { Button, Font } from 'components/molecules';
import { ERROR_TYPE } from 'const/types';
import { useHistory } from 'react-router-dom';

interface ErrorProps {
    code: ERROR_TYPE;
}

const Error = ({ code }: ErrorProps) => {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };

    return (
        <div>
            <Font fontType="h2" label={''} />
            <Button label="뒤로가기" onClick={goBack} />
        </div>
    );
};

export default Error;
