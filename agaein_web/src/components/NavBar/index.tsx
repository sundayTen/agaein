import React, { useState } from 'react';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import { DarkMode, Manu, ManuBox, Nav, Title } from './style';

interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    const [darkToggle, setDarkToggle] = useState<boolean>(false);
    return (
        <Nav>
            <Manu>
                <MenuIcon
                    style={{ width: 40 }}
                    onClick={() => (setMenuToggle(menuToggle ? false : true))}
                />
            </Manu>
            <ManuBox>
                <Title>AGAEIN</Title>
            </ManuBox>
            <button style={{ width: 70 }}>로그인</button>
            <DarkMode onClick={() => (setDarkToggle(menuToggle ? false : true))}>
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
