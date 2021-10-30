// @ts-nocheck

import { useContext } from 'react';
import { Nav, Title, AgaeinIconImg } from './NavBar.style';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_LOGIN_KEY } from 'config/server';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/userContext';
import Font from '../Font';
import Button from '../Button';
import KakaoLoginButton from 'assets/image/kakao_login.png';
interface KaKaoLoginResult {
    response: LoginResponse;
    profile?: UserProfile | undefined;
}

const NavBar = () => {
    const { isLoggedIn, login, signOut } = useContext(UserContext);

    const onLoginComplete = (result: KaKaoLoginResult) => {
        login(result.response.access_token, String(result.profile.id));
    };

    const onLoginFailed = (result: KaKaoError) => {
        console.error(result);
    };
    return (
        <Nav>
            <Link to="/">
                <Title>
                    <AgaeinIconImg alt="" src="https://img.icons8.com/ios/50/000000/github--v1.png" />
                    <Font label="AGAEIN" fontType="h3" fontWeight="bold" />
                </Title>
            </Link>
            {isLoggedIn ? (
                <Button label="로그아웃" size="SMALL" onClick={signOut} />
            ) : (
                <KakaoLogin
                    token={KAKAO_LOGIN_KEY}
                    onSuccess={onLoginComplete}
                    onFail={onLoginFailed}
                    getProfile={true}
                    useLoginForm={true}
                    type="button"
                    style={{}}
                >
                    <img src={KakaoLoginButton} alt="카카오 로그인" />
                </KakaoLogin>
            )}
        </Nav>
    );
};
export default NavBar;
