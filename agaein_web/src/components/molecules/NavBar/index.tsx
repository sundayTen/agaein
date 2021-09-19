// @ts-nocheck

import React, { useState } from 'react';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import { DarkMode, Manu, ManuBox, Nav, Title } from './style';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_LOGIN_KEY } from 'config/server';
import Cookies from 'universal-cookie';

interface NavBarProps {}

interface KaKaoLoginResult {
    response: LoginResponse;
    profile?: UserProfile | undefined;
}

const NavBar = (props: NavBarProps) => {
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    const [darkToggle, setDarkToggle] = useState<boolean>(false);
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
            <Manu>
                <Title>
                    <img src="https://img.icons8.com/ios/50/000000/github--v1.png" style={{ width: 28, height: 28 }} />
                    Agaein
                </Title>
            </Manu>
            {login ? (
                <Title style={{ marginLeft: 'auto' }}>환영합니다</Title>
            ) : (
                <KakaoLogin
                    token={KAKAO_LOGIN_KEY}
                    onSuccess={onLoginComplete}
                    onFail={(result) => {
                        console.log(result);
                    }}
                    getProfile={true}
                    useLoginForm={true}
                    style={{
                        fontFamily: 'Noto Sans KR',
                        marginLeft: 'auto',
                        cursor: 'pointer',
                        width: '72px',
                        height: '40px',
                        fontSize: '16px',
                        lineHeight: '23px',
                        border: 0,
                        background: 'transparent',
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
