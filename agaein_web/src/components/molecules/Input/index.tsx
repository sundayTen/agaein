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

    &::placeholder {
        font-weight: 300;
        color: ${(props) => props.theme.light.DarkGrey1};
    }

    &:focus {
        outline: 0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
