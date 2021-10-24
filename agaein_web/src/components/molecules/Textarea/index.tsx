import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    display: block;
`;

const StyledTextarea = styled.textarea`
    vertical-align: top;
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000;
    resize: none;
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

type TextareaProps = JSX.IntrinsicElements['textarea'];

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    return (
        <Label>
            <StyledTextarea {...props} ref={ref} />
        </Label>
    );
});

export default Textarea;
