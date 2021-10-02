import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Textarea from 'components/molecules/Textarea';

const Form = styled.div`
    flex: 1;
`;

interface FormNameProps {}

export function FormEtc(props: FormNameProps) {
    return (
        <FormRow>
            <FormLabel>그 외 특징</FormLabel>
            <Form>
                <Textarea placeholder="내용을 입력해주세요" />
            </Form>
        </FormRow>
    );
}
