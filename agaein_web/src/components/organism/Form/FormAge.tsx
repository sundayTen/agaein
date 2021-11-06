//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const AgeWrapper = styled.div`
    display: inline-block;

    label {
        display: inline-block;
        width: 100px;
        margin-right: 8px;
    }

    & + & {
        margin-left: 16px;
    }
`;

interface FormAgeProps {
    name: string;
    onChange?: () => void;
}

export function FormAge({ name, onChange }: FormAgeProps) {
    const [age, setAge] = useState({
        year: '',
        month: '',
    });

    useEffect(() => {
        const monthAge = age.year*12 + age.month*1;
        onChange?.(monthAge, name);
    }, [age])

    function inputChangeHandler(value: string, date: string) {
        setAge((prev) => ({ ...prev, [date]: value }));
    }

    return (
        <FormRow>
            <FormLabel>나이</FormLabel>
            <Form>
                <AgeWrapper>
                    <Input type="tel" value={age.year} onChange={(e) => inputChangeHandler(e.target.value, 'year')} />년
                </AgeWrapper>
                <AgeWrapper>
                    <Input type="tel" value={age.month} onChange={(e) => inputChangeHandler(e.target.value, 'month')} />
                    개월
                </AgeWrapper>
            </Form>
        </FormRow>
    );
}
