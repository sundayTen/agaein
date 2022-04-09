import styled from 'styled-components';

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 80px 80px 120px 80px;
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
    text-align: left;
`;

export const TeamLogo = styled.img`
    margin: 0 auto;
    width: 200px;
    height: 80px;
`;

export const NotionIcon = styled.img`
    width: 26px;
    height: 26px;
    resize-mode: contain;
    margin-right: 6px;
`;
export const NotionFont = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.light.white};
`;

export const FooterContact = styled.div`
    flex: 1;
    text-align: right;
`;

export const ContactButton = styled.button`
    display: flex;
    align-self: flex-end;
    width: 222px;
    height: 32px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.light.DarkGrey2};
    color: ${(props) => props.theme.light.white};
    align-items: center;
    justify-content: center;
    padding: 11px auto;
`;
