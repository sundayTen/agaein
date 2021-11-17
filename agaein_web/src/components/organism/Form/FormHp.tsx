import React, { useEffect, useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import MapModal from 'components/organism/mapModal/MapModal';

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
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value, name);
    };
    return (
        <>
            <FormRow>
                <FormLabel>연락처</FormLabel>
                <Form>
                    <MainHp>
                        <Input type="text" placeholder="'-'을 제외한 숫자만 입력해주세요" onChange={inputChange} />
                    </MainHp>
                </Form>
            </FormRow>
        </>
    );
}
