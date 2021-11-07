import Input from 'components/molecules/Input';
import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import ReactKaKaoMap from '../ReactKakaoMap/ReactKakaoMap';
import { AddressInput, InputForm, Search } from './MapModal.style';
interface MapModalProps {
    open: boolean;
    close: () => void;
    setAddress: (value: object) => void;
}
const MapModal = ({ open, close, setAddress }: MapModalProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [addressValue, setAddressValue] = useState({});

    const mapSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(searchValue);
        setSearchValue('');
    };

    const saveAddress = () => {
        setAddressValue(addressValue);
        setAddress(addressValue);
    };

    return (
        <Modal open={open} close={close} title="장소 찾기" btnName="선택" onBtn={saveAddress}>
            <InputForm className="inputForm" onSubmit={mapSearch}>
                <AddressInput
                    placeholder="지역을 입력하세요"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Search />
            </InputForm>
            <ReactKaKaoMap search={search} setAddress={setAddressValue} size={{ width: 600, height: 400 }} />
        </Modal>
    );
};

export default MapModal;
