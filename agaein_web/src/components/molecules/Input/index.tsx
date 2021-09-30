import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #BFC4CA;
    border-radius: 4px;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;

    &::placeholder {
        color: #BFC4CA;
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
        <StyledInput
            {...props}
            ref={ref}
        />
    );
});

export default Input;
