import styled from 'styled-components';

export const ChipContainer = styled.div`
    display: inline-block;
    background-color: ${(props) => props.theme.light.primary};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.white};
`;
