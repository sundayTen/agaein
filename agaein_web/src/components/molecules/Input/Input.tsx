import { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef, useState } from 'react';
import { StyledInput, Label, ErrorIcon, ErrorMsg } from './Input.style';
interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
    ErrorMessage?: string;
}

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
    ErrorMessage?: string;
}

export interface InputRefProps {
    getValue: () => string | undefined;
    focus: () => void;
}

const Input = forwardRef<InputRefProps, InputProp>((props, ref) => {
    const { isError, ErrorMessage, ...others } = props;
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (inputRef && inputRef.current?.value) {
                return inputRef.current.value;
            }
        },
        focus: () => inputRef.current?.focus(),
    }));
    return (
        <>
            <Label>
                <StyledInput
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    {...others}
                    isError={isError}
                />
                {isError && <ErrorIcon />}
            </Label>
            {isError && <ErrorMsg>{ErrorMessage}</ErrorMsg>}
        </>
    );
});

export default Input;
