import { forwardRef } from 'react';
import { StyledInput, Label } from './Input.style';

type InputProps = JSX.IntrinsicElements['input'];

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <Label>
            <StyledInput {...props} ref={ref} />
        </Label>
    );
});

export default Input;
