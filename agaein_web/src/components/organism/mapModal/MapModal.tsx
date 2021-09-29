import Input from 'components/molecules/Input';
import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
interface MapModalProps {
    open: boolean;
    close: Function;
    address: Function;
}
const MapModal = ({ open, close, address }: MapModalProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [save, setSave] = useState(false);
    const [search, setSearch] = useState('');
    const onChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const mapSearch = (e: any) => {
        e.preventDefault();
        setSearch(searchValue);
        setSearchValue('');
    };

    useEffect(() => {
        setSave(false);
        if (addressValue !== '') {
            address(addressValue);
        }
    }, [addressValue]);
    return (
        <Modal open={open} close={close}>
            <form className="inputForm" onSubmit={mapSearch}>
                <input placeholder="검색어를 입력하세요" onChange={onChange} value={searchValue} />
                <button style={{ background: '#00ffff' }} type="submit">
                    검색
                </button>
            </form>
            <KakaoMap search={search} addressValue={setAddressValue} save={save} />
            <button style={{ background: '#00ffff', float: 'right' }} onClick={() => setSave(true)}>
                선택 완료
            </button>
        </Modal>
    );
};

export default MapModal;
