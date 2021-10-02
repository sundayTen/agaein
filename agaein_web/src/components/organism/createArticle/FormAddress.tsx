import React from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';

const Form = styled.div`
    flex: 1;
`;

const MainAddress = styled.div`
    display: flex;

    label {
        flex: 1;
        margin-right: 10px;
    }

    button {
        height: auto;
    }
`;

const DetailAddress = styled.div`
    margin-top: 10px;
`;

interface FormAddressProps {}

export function FormAddress(props: FormAddressProps) {
    return (
        <FormRow>
            <FormLabel>실종지역*</FormLabel>
            <Form>
                <MainAddress>
                    <Input type="text" placeholder="지역명" disabled />
                    <Button label="검색" type="SMALL" onClick={() => {}} />
                </MainAddress>
                <DetailAddress>
                    <Input type="text" placeholder="세부 장소" />
                </DetailAddress>
            </Form>
        </FormRow>
    );
}
