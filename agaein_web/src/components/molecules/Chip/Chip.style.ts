import styled from 'styled-components';

export const ChipContainer = styled.div`
    display: inline-block;
    background-color: ${(props) => props.theme.light.primary};
    padding: 4px 10px;
    border-radius: 4px;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
`;
