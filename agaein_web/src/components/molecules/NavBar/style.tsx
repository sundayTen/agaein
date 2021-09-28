import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    padding: 0 40px;
    border-bottom: 1px solid rgba(44, 44, 44, 0.233);
    box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
    
`;

export const Title = styled.h1`
    color: #5f6871;
    font-size: 24px;
    line-height: 28px;
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
