import React, { forwardRef } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

const StyledCheckbox = styled.span`
    display: inline-block;
    vertical-align: top;
    padding: 3px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid;
    border-color: ${(props) => props.theme.light.DarkGrey1};

    svg {
        display: none;
        width: 15px;
    }

    &:hover {
        border-color: ${(props) => props.theme.light.primary};

        svg {
            display: block;
            color: ${(props) => props.theme.light.primary100};
        }
    }
`;

const Label = styled.label`
    cursor: pointer;

    input:checked + ${StyledCheckbox} {
        border-color: ${(props) => props.theme.light.primary};
        background-color: ${(props) => props.theme.light.primary};

        svg {
            display: block;
            color: ${(props) => props.theme.light.white};
        }
    }

    input:disabled + ${StyledCheckbox} {
        border-color: ${(props) => props.theme.light.DarkGrey1};
        background-color: ${(props) => props.theme.light.lightGrey2};
    }
`;

type InputProps = JSX.IntrinsicElements['input'];

const Checkbox = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <Label>
            <input type="checkbox" className="blind" {...props} ref={ref} />
            <StyledCheckbox>
                <CheckIcon />
            </StyledCheckbox>
        </Label>
    );
});

export default Checkbox;
