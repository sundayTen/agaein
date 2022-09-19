//@ts-nocheck

import { ChevronDownIcon } from '@heroicons/react/solid';
import KakaoLogin from 'react-kakao-login';

import styled from 'styled-components';

interface HeaderProps {
    isBorder: boolean;
}

export const Header = styled.header<HeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding: 0 40px;
    background-color: ${(props) => props.theme.light.background};
    z-index: 998;
    border-bottom: ${(props) => (props.isBorder ? '1px solid #eeee' : '')};
`;

export const AgaeinIconImg = styled.img`
    width: 160px;
    height: 55px;
`;

export const UserInfo = styled.div`
    position: relative;
`;

export const UserTag = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const UserDropbox = styled.div`
    position: absolute;
    top: 36px;
    right: 0;
    width: 100px;
    padding: 6px 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.light.white};
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.12);
    border-radius: 6px;
`;

export const DropboxItem = styled.button`
    width: 100%;
    padding: 6px 16px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
    text-align: left;
`;

export const ChevronDown = styled(ChevronDownIcon)`
    width: 24px;
    height: 24px;
`;

export const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin-right: 14px;
    object-fit: cover;
`;

export const KaKaoLoginButton = styled(KakaoLogin)`
    box-sizing: border-box;
    background: #fee500;
    border-radius: 6px;

    font-family: NanumSquareRound, sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #191919;
`;

export const KaKaoIcon = styled.img`
    width: 18px;
    vertical-align: -4px;
    margin-right: 6px;

    @media screen and (max-width: 420px){
        margin-right: 0px;
    }
`;
