import styled from 'styled-components';

export const ChipContainer = styled.div`
    padding: 4px 10px;
    border-radius: 17px;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    display: inline-block;
`;
