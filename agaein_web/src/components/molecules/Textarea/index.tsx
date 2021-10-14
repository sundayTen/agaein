import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    display: block;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000;
    resize: none;

    &::placeholder {
        font-weight: 300;
        color: ${(props) => props.theme.light.DarkGrey1};
    }

    &:focus {
        outline: 0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;

type TextareaProps = JSX.IntrinsicElements['textarea'];

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    return (
        <Label>
            <StyledTextarea {...props} ref={ref} />
        </Label>
    );
});

export default Textarea;
