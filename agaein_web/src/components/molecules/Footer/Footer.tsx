import { ModalContext } from 'contexts';
import { useContext } from 'react';
import CustomerServiceContents from './CustomerServiceContents';
import { FooterContainer, FooterCopyright, TeamLogo, LogoRow, ContactButton } from './Footer.style';

const Footer = () => {
    const { show } = useContext(ModalContext);
    const onClickContact = () => {
        show({
            title: '문의하기',
            content: '아래 내용을 작성해주세요. 이메일은 입력하지 않으셔도 됩니다.',
            children: <CustomerServiceContents />,
        });
    };

    return (
        <FooterContainer>
            <LogoRow>
                <TeamLogo />

                <ContactButton onClick={onClickContact} type="button">
                    문의하기
                </ContactButton>
            </LogoRow>
            <FooterCopyright>ⓒ Copyright 2022 썬데이텐(SunDayTen) All Rights Reserved.</FooterCopyright>
        </FooterContainer>
    );
};

export default Footer;
