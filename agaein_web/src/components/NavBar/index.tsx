// @ts-nocheck

import React, { useState } from 'react';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import { DarkMode, Manu, ManuBox, Nav, Title } from './style';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_LOGIN_KEY } from 'config/server';

interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    const [darkToggle, setDarkToggle] = useState<boolean>(false);
    return (
        <Nav>
            <Manu>
                <MenuIcon style={{ width: 40 }} onClick={() => setMenuToggle(menuToggle ? false : true)} />
            </Manu>
            <ManuBox>
                <Title>AGAEIN</Title>
            </ManuBox>
            <KakaoLogin
                token={KAKAO_LOGIN_KEY}
                buttonTitle="카카오 계정으로 로그인"
                onSuccess={(result) => {
                    console.log(result);
                }}
                onFail={(result) => {
                    console.log(result);
                }}
                getProfile={true}
                useLoginForm={true}
                style={{
                    cursor: 'pointer',
                    backgroundColor: 'yellow',
                    paddingRight: 20,
                    paddingLeft: 20,
                    width: 200,
                    height: 50,
                    fontSize: 16,
                    fontWeight: 'bold',
                    borderRadius: 10,
                }}
            />
            <DarkMode onClick={() => (darkToggle ? setdarkToggle(false) : setdarkToggle(true))}>
                {darkToggle ? (
                    <MoonIcon style={{ width: 30, height: 30 }} />
                ) : (
                    <SunIcon style={{ width: 30, height: 30 }} />
                )}
            </DarkMode>
        </Nav>
    );
};
export default NavBar;
