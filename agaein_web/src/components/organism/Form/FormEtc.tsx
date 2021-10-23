import React from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Textarea from 'components/molecules/Textarea';

interface FormNameProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
}

export function FormEtc({ name, value, onChange }: FormNameProps) {
    function inputChangeHandler(value: string) {
        onChange?.(value, name);
    }

    return (
        <FormRow>
            <FormLabel>기타 특징</FormLabel>
            <Form>
                <Textarea
                    placeholder="그 외 특징을 작성해주세요"
                    value={value}
                    onChange={(e) => inputChangeHandler(e.target.value)}
                />
            </Form>
        </FormRow>
    );
}
