import styled from 'styled-components';
import Logo from '@assets/image/sundayTen.png';

export const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    height: 232px;
    padding: 0 120px;
    justify-content: center;
    background-color: ${(props) => props.theme.light.black};

    @media screen and (max-width: 420px) {
        padding: 0 20px;
    }
`;

export const FooterCopyright = styled.p`
    font-size: 12px;
    line-height: 18px;
    border-radius: 4px;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.DarkGrey1};
`;

export const LogoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TeamLogo = styled.img.attrs({
    src: Logo,
    alt: '썬데이텐 로고',
})`
    width: 174px;
    height: 66px;
`;

export const ContactButton = styled.button`
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.light.DarkGrey2};
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme.light.white};
`;
