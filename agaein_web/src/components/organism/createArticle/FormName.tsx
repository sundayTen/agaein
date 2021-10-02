import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const Form = styled.div`
    flex: 1;
`;

interface FormNameProps {}

export function FormName(props: FormNameProps) {
    return (
        <FormRow>
            <FormLabel>이름</FormLabel>
            <Form>
                <Input type="text" placeholder="홍길동" />
            </Form>
        </FormRow>
    );
}
