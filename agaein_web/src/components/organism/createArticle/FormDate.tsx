import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const Form = styled.div`
    flex: 1;
`;

interface FormDateProps {}

export function FormDate(props: FormDateProps) {
    return (
        <FormRow>
            <FormLabel>실종일*</FormLabel>
            <Form>{/* 캘린더 */}</Form>
        </FormRow>
    );
}
