import styled from 'styled-components';

export const StyledButton = styled.button`
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    border: 1px solid #bfc4ca;
    background-color: ${(props) => props.color ?? 'grey'};
    font-weight: 700;
`;
