import { useState } from 'react';
import { FormRow, FormLabel } from './Form.style';
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
    box-sizing: border-box;
`;

const RadioLabel = styled.label`
    cursor: pointer;

    input:checked + ${RadioIcon} {
        border-color: ${(props) => props.theme.light.primary};
        background-color: ${(props) => props.theme.light.primary};

        &:after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${(props) => props.theme.light.white} !important;
        }
    }

    &:hover input + ${RadioIcon} {
        border-color: ${(props) => props.theme.light.primary};

        &:after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${(props) => props.theme.light.primary100};
        }
    }

    & + & {
        margin-left: 20px;
    }
`;

interface FormGenderProps {
    name: string;
    onChange: (value: any, name: string) => void;
}

export function FormGender({ name, onChange }: FormGenderProps) {
    const [gender, setGender] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setGender(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>성별</FormLabel>
            <Form>
                <RadioLabel>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="blind"
                        onChange={inputChangeHandler}
                        checked={gender === 'male'}
                    />
                    <RadioIcon />
                    수컷
                </RadioLabel>
                <RadioLabel>
                    <input
                        type="radio"
                        name="gender"
                        value="femail"
                        className="blind"
                        onChange={inputChangeHandler}
                        checked={gender === 'femail'}
                    />
                    <RadioIcon />
                    암컷
                </RadioLabel>
                <RadioLabel>
                    <input
                        type="radio"
                        name="gender"
                        value="unknown"
                        className="blind"
                        onChange={inputChangeHandler}
                        checked={gender === 'unknown'}
                    />
                    <RadioIcon />
                    모름
                </RadioLabel>
            </Form>
        </FormRow>
    );
}
