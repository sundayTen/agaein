import styled from 'styled-components'

export const Nav = styled.nav`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    top: 0;
    background-color: white;
    border-bottom: 1px solid rgba(44, 44, 44, 0.233);
    box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
    `;

export const Manu = styled.div`
    margin: 15px;
    cursor:pointer;
`;

export const Title = styled.h1`
    text-align: center;
    top: 45%;
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

export const SideBar = styled.div`
    width: 300px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -300px;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: .3s ease all;
    transition: .3s ease all;
    background: #333;
`;

