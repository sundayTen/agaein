import React from 'react';
import {
    FooterContainer,
    FooterCopyright,
    TeamLogo,
    FooterTeam,
    FooterContact,
    ContactButton,
    NotionIcon,
    NotionFont,
} from './Footer.style';
import SundayTenLogo from 'assets/image/sundayTen.png';
import NotionLogo from 'assets/image/notion.png';

interface FooterProps {}

const Footer = (props: FooterProps) => {
    return (
        <FooterContainer>
            <FooterTeam>
                <TeamLogo src={SundayTenLogo} />
                <FooterCopyright>ⓒ Copyright 2021 썬데이텐(SunDay10) All Rights Reserved.</FooterCopyright>
            </FooterTeam>
            <FooterContact>
                <ContactButton type="button">
                    <NotionIcon src={NotionLogo} />
                    <NotionFont>Notion 보러가기</NotionFont>
                </ContactButton>
            </FooterContact>
        </FooterContainer>
    );
};

export default Footer;
