import React from 'react';
import { FooterContainer, FooterCopyright, FooterTeam, TeamLogo, TeamName, FooterContact, ContactButton } from './Footer.style';

interface FooterProps {}

const Footer = (props: FooterProps) => {
    return (
        <FooterContainer>
            <FooterCopyright>ⓒ Copyright 2021 썬데이텐(SunDay10) All Rights Reserved.</FooterCopyright>
            <FooterTeam>
                <TeamLogo />
                <TeamName>Sunday10</TeamName>
            </FooterTeam>
            <FooterContact>
                <ContactButton type="button">문의하기</ContactButton>    
            </FooterContact>
        </FooterContainer>
    );
};

export default Footer;
