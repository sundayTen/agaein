// @ts-nocheck

import { useState } from 'react';
import { Nav, Title, AgaeinIconImg } from './style';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_LOGIN_KEY } from 'config/server';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

interface NavBarProps {}

interface KaKaoLoginResult {
    response: LoginResponse;
    profile?: UserProfile | undefined;
}

const NavBar = (props: NavBarProps) => {
    const [login, setLogin] = useState(false);
    const cookies = new Cookies();

    const onLoginComplete = (result: KaKaoLoginResult) => {
        cookies.set('token', result.response.access_token, {
            path: '/',
        });
        setLogin(true);
    };

    return (
        <Nav>
            <Link to="/">
                <Title>
                    <AgaeinIconImg alt="" src="https://img.icons8.com/ios/50/000000/github--v1.png" />
                    Agaein
                </Title>
            </Link>
            {login ? (
                <Title>환영합니다</Title>
            ) : (
                <KakaoLogin
                    token={KAKAO_LOGIN_KEY}
                    onSuccess={onLoginComplete}
                    onFail={(result) => {
                        console.log(result);
                    }}
                    getProfile={true}
                    useLoginForm={true}
                    type="button"
                    style={{
                        width: '72px',
                        height: '40px',
                        fontSize: '16px',
                        lineHeight: '23px',
                        color: '#5F6871',
                    }}
                >
                    로그인
                </KakaoLogin>
            )}
        </Nav>
    );
};
export default NavBar;
