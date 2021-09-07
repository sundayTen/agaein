// @ts-nocheck
import KakaoLogin from 'react-kakao-login';

const Login = () => {
    return (
        <>
            <KakaoLogin
                token={'13702644d8b435086725de49e6574978'}
                buttonText="카카오 계정으로 로그인"
                onSuccess={(result) => {
                    console.log(result);
                }}
                getProfile={true}
                useLoginForm={true}
            />
        </>
    );
};

export default Login;
