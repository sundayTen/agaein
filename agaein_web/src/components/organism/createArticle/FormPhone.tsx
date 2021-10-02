import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const Form = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        width: 80px;
    }
`;

interface FormPhoneProps {}

export function FormPhone(props: FormPhoneProps) {
    return (
        <FormRow>
            <FormLabel>연락처</FormLabel>
            <Form>
                <Input type="tel" placeholder="" maxLength={3} />
                -
                <Input type="tel" placeholder="" maxLength={4} />
                -
                <Input type="tel" placeholder="" maxLength={4} />
            </Form>
        </FormRow>
        //TODO: 입력하면 자동으로 탭 넘어가도록
    );
}
