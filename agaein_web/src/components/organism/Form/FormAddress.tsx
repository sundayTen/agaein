import React, { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import MapModal from 'components/organism/mapModal/MapModal';

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
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <FormRow>
                <FormLabel>
                    실종지역
                    <RequiredIcon />
                </FormLabel>
                <Form>
                    <MainAddress>
                        <Input type="text" placeholder="지역명" value={address} disabled />
                        <Button
                            label="장소찾기"
                            size="SMALL"
                            buttonStyle="PAINTED"
                            onClick={() => {
                                setIsOpenModal(true);
                            }}
                        />
                    </MainAddress>
                    <DetailAddress>
                        <Input type="text" placeholder="상세 장소 (xx가게 앞, 육교 밑 등)" />
                    </DetailAddress>
                </Form>
            </FormRow>
            <MapModal open={isOpenModal} close={closeModal} setAddress={setAddress} />
        </>
    );
}
