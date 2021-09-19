import styled from 'styled-components';

const defaultWidth = 200;

export const StyledButton = styled.button`
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    border: 1px solid #bfc4ca;
    background-color: ${(props) => props.color ?? 'white'};
    width: ${defaultWidth}px;
    font-weight: 700;
    cursor: pointer;
`;
