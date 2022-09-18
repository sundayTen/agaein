import { useEffect, useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from './Form.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import MapModal from 'components/organism/mapModal/MapModal';
import { Location } from 'graphql/generated/generated';

interface MainAddressProps {
    type: string;
}
const MainAddress = styled.div<MainAddressProps>`
    display: flex;

    label {
        flex: 1;
        margin-right: ${(props) => (props.type === 'LFG_M' ? `87px` : `10px`)};
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
    value?: string;
    address?: Location;
    onChange: (value: any, name: string) => void;
}

export function FormAddress({ name, type, onChange, address }: FormAddressProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [addressValue, setAddressValue] = useState<Location>({
        lat: 0,
        lng: 0,
        address: '',
        roadAddress: '',
        detail: '',
    } as Location);

    const closeModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        onChange(addressValue, name);
    }, [addressValue]);

    useEffect(() => {
        if (!!address) setMainAddress(address);
    }, [address]);

    const setMainAddress = (value: any) => {
        setAddressValue((prev) => ({
            ...prev,
            lat: value?.lat,
            lng: value?.lng,
            address: value?.address,
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
                    <MainAddress type={type}>
                        <Input
                            type="text"
                            placeholder={type === 'LFG_M' ? '지도에서 발견 장소를 클릭해주세요' : '지역명'}
                            value={addressValue.address}
                            readOnly
                        />
                        {type === 'LFG_M' ? undefined : (
                            <Button
                                label="장소찾기"
                                size="MEDIUM"
                                buttonStyle="BLACK"
                                onClick={() => {
                                    setIsOpenModal(true);
                                }}
                            />
                        )}
                    </MainAddress>
                    {type === 'LFG_M' ? undefined : (
                        <DetailAddress>
                            <Input
                                type="text"
                                placeholder="상세 장소 (xx가게 앞, 육교 밑 등)"
                                value={addressValue?.detail as string}
                                onChange={(e) => setDetailAddress(e.target.value)}
                            />
                        </DetailAddress>
                    )}
                </Form>
            </FormRow>
            <MapModal open={isOpenModal} close={closeModal} setAddress={setMainAddress} />
        </>
    );
}
