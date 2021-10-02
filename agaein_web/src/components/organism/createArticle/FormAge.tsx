import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const Form = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

const AgeWrapper = styled.div`
    display: flex;
    align-items: center;

    label {
        width: 100px;
        margin-right: 8px;
    }
`;

interface FormAgeProps {}

export function FormAge(props: FormAgeProps) {
    return (
        <FormRow>
            <FormLabel>나이</FormLabel>
            <Form>
                <AgeWrapper>
                    <Input type="text" /> 살
                </AgeWrapper>
                <AgeWrapper>
                    <Input type="text" /> 개월
                </AgeWrapper>
            </Form>
        </FormRow>
    );
}
