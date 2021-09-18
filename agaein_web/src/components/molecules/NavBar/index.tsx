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
                <Title>AGAEIN</Title>
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
                        marginLeft: 'auto',
                        cursor: 'pointer',
                        backgroundColor: 'yellow',
                        width: 220,
                        height: 50,
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderRadius: 10,
                    }}
                />
            )}
        </Nav>
    );
};
export default NavBar;
