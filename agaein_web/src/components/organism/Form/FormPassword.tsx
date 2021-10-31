import React, { useState } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

interface FormPasswordProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
}

export function FormPassword({ name, value, onChange }: FormPasswordProps) {
    const [password, setPassword] = useState({
        password1: '',
        password2: '',
    });

    function inputChangeHandler(value: string, type: string) {
        setPassword((prev) => ({ ...prev, [type]: value }));

        //TODO: 비밀번호 체크 조건 변경
        if (type === 'password2' && password.password1 !== password.password2) {
            console.log('비밀번호가 같지 않습니다');
            return;
        }

        if (password.password1.length === 4 && password.password1 === password.password2) {
            onChange?.(name, password.password1);
        }
    }

    return (
        <>
            <FormRow>
                <FormLabel>비밀번호</FormLabel>
                <Form>
                    <Input
                        type="password"
                        placeholder="비밀번호 4자리를 입력해주세요"
                        maxLength={4}
                        value={password.password1}
                        onChange={(e) => inputChangeHandler(e.target.value, 'password1')}
                    />
                </Form>
            </FormRow>
            <FormRow>
                <FormLabel>비밀번호 확인</FormLabel>
                <Form>
                    <Input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        maxLength={4}
                        value={password.password2}
                        onChange={(e) => inputChangeHandler(e.target.value, 'password2')}
                    />
                </Form>
            </FormRow>
        </>
    );
}
