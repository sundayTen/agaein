import React, { useState } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const InputWrapper = styled.div`
    position: relative;

    svg {
        position: absolute;
        top: 9px;
        left: 10px;
        width: 24px;
        height: 24px;
        color: ${(props) => props.theme.light.DarkGrey1};
    }
    input {
        padding-left: 34px;
    }
`;

interface FormGratuityProps {
    name: string;
    value?: string;
    onChange?: (value: any, name: string) => void;
}

export function FormGratuity({ name, value, onChange }: FormGratuityProps) {
    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const onlyNumber = Number(value.replace(/[^0-9]/g, ''));
        onChange?.(onlyNumber, name);
    }

    return (
        <FormRow>
            <FormLabel>사례금</FormLabel>
            <Form>
                <InputWrapper>
                    <CurrencyDollarIcon />
                    <Input
                        type="text"
                        placeholder="금액을 입력해주세요"
                        value={value}
                        onChange={(e) => inputChangeHandler(e)}
                    />
                </InputWrapper>
            </Form>
        </FormRow>
    );
}
