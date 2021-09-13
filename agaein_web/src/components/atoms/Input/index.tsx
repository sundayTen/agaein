import React, { forwardRef } from 'react';

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
        <input
            {...props}
            width={500}
            ref={ref}
            type="search"
            style={{ fontSize: 16, fontWeight: 'bold', caretColor: 'red', border: 0 }}
        />
    );
});

export default Input;