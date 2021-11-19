import Input from 'components/molecules/Input';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, FormLabel, FormRow } from '../../pages/createArticle/CreateArticle.style';

const MainHp = styled.div`
    display: flex;

    label {
        flex: 1;
        margin-right: 87px;
    }
`;

interface FormHpProps {
    type?: string;
    name: string;
    onChange: (value: string, name: string) => void;
}

export function FormHp({ type, name, onChange }: FormHpProps) {
    const [value, setValue] = useState('');
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numCheck = e.target.value.replace(/[^0-9]/g, '');
        const value = numCheck;
        setValue(numCheck);
        onChange(value, name);
    };
    return (
        <>
            <FormRow>
                <FormLabel>연락처</FormLabel>
                <Form>
                    <MainHp>
                        <Input
                            type="text"
                            placeholder="'-'을 제외한 숫자만 입력해주세요"
                            onChange={inputChange}
                            maxLength={11}
                            value={value}
                        />
                    </MainHp>
                </Form>
            </FormRow>
        </>
    );
}
