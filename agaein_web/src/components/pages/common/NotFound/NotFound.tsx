import notFound from 'assets/image/notFound.png';
import { NotFoundButtonGroup, NotFoundContainer, NotFoundImage } from './NotFound.style';
import { Button, Font } from 'components/molecules';
import { useHistory } from 'react-router-dom';

const NotConnected = () => {
    const history = useHistory();
    const goHome = () => {
        history.replace('/');
    };
    const goBack = () => {
        history.goBack();
    };
    return (
        <NotFoundContainer>
            <Font label="404 Not Found" fontType="h1" fontWeight="bold" style={{ marginBottom: 8 }} />
            <Font label={`요청하신 페이지를 찾을 수 없습니다.`} fontType="h3" fontWeight="normal" />
            <Font label={`존재하지 않거나, 사용할 수 없는 경로를 이용하셨어요.`} fontType="h3" fontWeight="normal" />
            <NotFoundImage src={notFound} alt="Not Found" />
            <NotFoundButtonGroup>
                <Button label="이전 페이지" size="LARGE" onClick={goBack} />
                <Button label="홈으로 가기" size="LARGE" buttonStyle={'PAINTED'} onClick={goHome} />
            </NotFoundButtonGroup>
        </NotFoundContainer>
    );
};

export default NotConnected;
