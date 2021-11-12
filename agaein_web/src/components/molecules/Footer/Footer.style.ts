import styled from 'styled-components';

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 114px;
    padding: 0 80px;
    background-color: ${(props) => props.theme.light.black};
`;

export const FooterCopyright = styled.p`
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    border-radius: 4px;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.DarkGrey1};
`;

export const FooterTeam = styled.div`
    flex: 1;
    text-align: center;
`;

export const TeamLogo = styled.div`
    margin: 0 auto;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.light.DarkGrey1};
`;

export const TeamName = styled.div`
    margin-top: 6px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.white};
`;

export const FooterContact = styled.div`
    flex: 1;
    text-align: right;
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
