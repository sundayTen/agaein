import { ChevronDownIcon } from '@heroicons/react/solid';

import styled from 'styled-components';

export const Nav = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 75px;
    padding: 0 40px;
    border-bottom: 1px solid rgba(44, 44, 44, 0.233);
    box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
    background-color: ${(props) => props.theme.light.background};
    z-index: 1000;
`;

export const Title = styled.div`
    display: flex;
`;

export const AgaeinIconImg = styled.img`
    width: 28px;
    height: 28px;
    margin-right: 6px;
    vertical-align: -7px;
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

export const StyledKakaoLogin = styled.div`
    background-color: #fee500;
    border-radius: 6px;
    padding: 9px 14px;
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
