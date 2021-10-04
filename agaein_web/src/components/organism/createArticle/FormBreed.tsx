import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Select from 'components/molecules/Select';

const Form = styled.div`
    flex: 1;
    display: flex;
`;

const SelectWrapper = styled.div`
    flex: 1;
    position: relative;

    & + & {
        margin-left: 10px;
    }
`;

interface FormBreedProps {}

export function FormBreed(props: FormBreedProps) {
    return (
        <FormRow>
            <FormLabel>동물 종류</FormLabel>
            <Form>
                <SelectWrapper>
                    <Select />
                </SelectWrapper>
                <SelectWrapper>
                    <Select />
                </SelectWrapper>
            </Form>
        </FormRow>
    );
}
