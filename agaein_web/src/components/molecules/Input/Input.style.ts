import styled, { css } from 'styled-components';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

interface StyledInputProps {
    isError: boolean | undefined;
}

const Label = styled.label`
    display: block;
    position: relative;
`;

const ErrorIcon = styled(ExclamationCircleIcon)`
    position: absolute;
    top: 11px;
    right: 14px;
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.light.negative};
`;

const ErrorMsg = styled.p`
    margin-top: 6px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.negative};
`;

const StyledInput = styled.input<StyledInputProps>`
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

    ${(props) =>
        props.isError &&
        css`
            border-color: ${(props) => props.theme.light.negative} !important;
            padding-right: 34px !important;
        `}
`;

export { StyledInput, Label, ErrorIcon, ErrorMsg };
