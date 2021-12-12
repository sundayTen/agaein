import { ChevronDownIcon } from '@heroicons/react/solid';
import KakaoLogin from 'react-kakao-login';

import styled from 'styled-components';

export const Nav = styled.header`
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
    z-index: 1000;
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    color: #5f6817;
`;

export const AgaeinIconImg = styled.img`
    width: 160px;
    height: 55px;
`;

export const ManuBox = styled.div`
    width: 100%;
`;

export const DarkMode = styled.button`
    background-color: black;
    color: white;
    width: 45px;
    height: 45px;
    border: none;
    margin: 15px;
    cursor: pointer;
    border-radius: 100%;
    text-align: center;
`;

export const UserTag = styled.button`
    display: flex;
    min-width: 80px;
    justify-content: center;
    align-items: center;
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
`;
export const KaKaoLoginButton = styled(KakaoLogin)`
    height: 40px;
    padding: 0 14px;
    box-sizing: border-box;
    background: #fee500;
    border-radius: 6px;
    font-family: NanumSquareRound, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #191919;
`;

export const KaKaoIcon = styled.img`
    width: 18px;
    vertical-align: -4px;
    margin-right: 6px;
`;
