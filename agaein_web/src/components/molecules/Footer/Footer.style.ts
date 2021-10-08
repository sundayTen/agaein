import styled from 'styled-components';

export const FooterContainer = styled.footer`
    margin: 30px 0;
    padding-left: 50px;
    border-top: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
`;
export const FooterItem = styled.p`
    font-size: 20px;
    margin: 10px 0;
    font-weight: 600;
`;
