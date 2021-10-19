import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';

const Form = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const RadioIcon = styled.span`
    display: inline-block;
    vertical-align: -6px;
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border-radius: 50%;
    border: 1px solid #bfc4ca;
`;

const RadioLabel = styled.label`
    cursor: pointer;

    input:checked + ${RadioIcon}:after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.light.DarkGrey1};
    }

    & + & {
        margin-left: 20px;
    }
`;

interface FormGenderProps {}

export function FormGender(props: FormGenderProps) {
    return (
        <FormRow>
            <FormLabel>성별</FormLabel>
            <Form>
                <RadioLabel>
                    <input type="radio" name="gender" value="male" className="blind" checked />
                    <RadioIcon />
                    남자
                </RadioLabel>
                <RadioLabel>
                    <input type="radio" name="gender" value="femail" className="blind" />
                    <RadioIcon />
                    여자
                </RadioLabel>
                <RadioLabel>
                    <input type="radio" name="gender" value="unknown" className="blind" />
                    <RadioIcon />
                    모름
                </RadioLabel>
            </Form>
        </FormRow>
    );
}
