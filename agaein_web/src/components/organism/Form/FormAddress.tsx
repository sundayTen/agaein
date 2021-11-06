import React, { useEffect, useState } from 'react';
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

interface FormAddressProps {
    name: string;
    type: string;
    onChange: (value: any, name: string) => {};
}

export function FormAddress({ name, type, onChange }: FormAddressProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [addressValue, setAddressValue] = useState({
        lat: 0,
        lng: 0,
        address: '',
        detail: '',
    });

    useEffect(() => {
        onChange(addressValue, name);
    }, [addressValue]);

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const setMainAddress = (value: any) => {
        setAddressValue((prev) => ({
            ...prev,
            lat: Number(value.lat),
            lng: Number(value.lng),
            address: value.address,
        }));
    };

    const setDetailAddress = (value: string) => {
        setAddressValue((prev) => ({
            ...prev,
            detail: value,
        }));
    };

    return (
        <>
            <FormRow>
                <FormLabel>
                    {type === 'LFP' ? '실종' : '발견'}지역
                    <RequiredIcon />
                </FormLabel>
                <Form>
                    <MainAddress>
                        <Input type="text" placeholder="지역명" value={addressValue.address} readOnly />
                        <Button
                            label="장소 찾기"
                            size="MEDIUM"
                            buttonStyle="BLACK"
                            onClick={() => {
                                setIsOpenModal(true);
                            }}
                        />
                    </MainAddress>
                    <DetailAddress>
                        <Input
                            type="text"
                            placeholder="상세 장소 (xx가게 앞, 육교 밑 등)"
                            value={addressValue.detail}
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />
                    </DetailAddress>
                </Form>
            </FormRow>
            <MapModal open={isOpenModal} close={closeModal} setAddress={setMainAddress} />
        </>
    );
}
