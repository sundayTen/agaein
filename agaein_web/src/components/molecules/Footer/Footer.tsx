import React from 'react';
import { FooterContainer, FooterItem } from './Footer.style';

interface FooterProps {}

const Footer = (props: FooterProps) => {
    return (
        <FooterContainer>
            <FooterItem>Agaein Team</FooterItem>
            <FooterItem>Footer Content</FooterItem>
        </FooterContainer>
    );
};

export default Footer;
