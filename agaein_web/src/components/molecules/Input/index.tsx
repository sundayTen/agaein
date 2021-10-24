import React, { forwardRef } from 'react';
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

type InputProps = JSX.IntrinsicElements['input'];

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    // useImperativeHandle(ref, () => ({
    //     reallyFocus: () => {
    //         ref.current.focus();
    //         console.log('Being focused!');
    //     },
    // }));

    // color나 세부 design이 정해지면 아래 스타일 수정 or Styled-Component로 변경
    return (
        <Label>
            <StyledInput {...props} ref={ref} />
        </Label>
    );
});

export default Input;
