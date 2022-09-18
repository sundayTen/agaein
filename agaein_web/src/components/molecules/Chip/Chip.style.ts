import styled from 'styled-components';

export const ChipContainer = styled.div<{ isDone: boolean }>`
    display: inline-block;
    background-color: ${(props) => (props.isDone ? props.theme.light.DarkGrey1 : props.theme.light.primary)};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.white};
`;
