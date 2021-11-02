import styled from 'styled-components';

const Label = styled.label`
    display: block;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #bfc4ca;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000;
    caret-color: ${(props) => props.theme.light.primary};

    &::placeholder {
        font-weight: 300;
        color: ${(props) => props.theme.light.DarkGrey1};
    }

    &:hover,
    &:active,
    &:focus {
        outline: 0;
        border-color: ${(props) => props.theme.light.primary};
    }

    &:disabled {
        border-color: ${(props) => props.theme.light.DarkGrey1};
        background-color: ${(props) => props.theme.light.lightGrey2};
    }
`;

export { StyledInput, Label };
