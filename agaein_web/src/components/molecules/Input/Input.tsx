import { FC, InputHTMLAttributes } from 'react';
import { StyledInput, Label, ErrorIcon, ErrorMsg } from './Input.style';
interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
    ErrorMessage?: string;
}

const Input: FC<InputProp> = ({ isError, ErrorMessage, ...props }) => {
    return (
        <>
            <Label>
                <StyledInput {...props} isError={isError} />
                {isError && <ErrorIcon />}
            </Label>
            {isError && <ErrorMsg>{ErrorMessage}</ErrorMsg>}
        </>
    );
};

export default Input;
