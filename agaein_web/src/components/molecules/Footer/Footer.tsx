import { ModalContext } from 'contexts';
import  { useContext } from 'react';
import CustomerServiceContents from './CustomerServiceContents';
import { FooterContainer, FooterCopyright, FooterTeam, TeamLogo, TeamName, FooterContact, ContactButton } from './Footer.style';

interface FooterProps {}

const Footer = (props: FooterProps) => {
    const { show } = useContext(ModalContext);
    const onClickContact = () => {
        show({
            title:"문의하기",
            content:"아래 내용을 작성해주세요. 이메일은 입력하지 않으셔도 됩니다.",
            children: <CustomerServiceContents/>
        })
    }

    return (
        <FooterContainer>
            <FooterCopyright>ⓒ Copyright 2022 썬데이텐(SunDay10) All Rights Reserved.</FooterCopyright>
            <FooterTeam>
                <TeamLogo />
                <TeamName>Sunday10</TeamName>
            </FooterTeam>
            <FooterContact>
                <ContactButton onClick={onClickContact} type="button">문의하기</ContactButton>    
            </FooterContact>
        </FooterContainer>
    );
};

export default Footer;
