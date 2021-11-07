import React from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Textarea from 'components/molecules/Textarea';

interface FormNameProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
    type?: string;
}

export function FormEtc({ name, value, onChange, type }: FormNameProps) {
    function inputChangeHandler(value: string) {
        onChange?.(value, name);
    }

    return (
        <FormRow>
            <FormLabel>기타 특징</FormLabel>
            <Form>
                <Textarea
                    placeholder={
                        type === 'LFG_M' ? '그 외 특징 및 상세 위치를 작성해주세요' : '그 외 특징을 작성해주세요'
                    }
                    value={value}
                    onChange={(e) => inputChangeHandler(e.target.value)}
                />
            </Form>
        </FormRow>
    );
}
