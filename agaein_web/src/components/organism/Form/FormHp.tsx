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
}

export function FormHp({ type }: FormHpProps) {
    const [hp, setHp] = useState<string>('');
    return (
        <>
            <FormRow>
                <FormLabel>연락처</FormLabel>
                <Form>
                    <MainHp>
                        <Input type="text" placeholder="'-'을 제외한 숫자만 입력해주세요" value={hp} />
                    </MainHp>
                </Form>
            </FormRow>
        </>
    );
}
