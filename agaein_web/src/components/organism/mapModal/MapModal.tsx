import Input from 'components/molecules/Input';
import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
interface MapModalProps {
    open: boolean;
    close: () => void;
    setAddress: (value: string) => void;
}
const MapModal = ({ open, close, setAddress }: MapModalProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [save, setSave] = useState(false);
    const [search, setSearch] = useState<string | undefined>(undefined);

    const mapSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(searchValue);
        setSearchValue('');
    };

    useEffect(() => {
        close();
    }, [save]);
    return (
        <Modal open={open} close={close}>
            <form className="inputForm" onSubmit={mapSearch}>
                <Input
                    style={{ width: 200 }}
                    placeholder="지역을 입력하세요"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <button style={{ background: '#00ffff' }} type="submit">
                    검색
                </button>
            </form>
            <KakaoMap search={search} setAddress={setAddress} save={save} onSave={setSave} />
            <button
                style={{ background: '#00ffff', float: 'right' }}
                onClick={() => {
                    setSave(true);
                }}
            >
                선택 완료
            </button>
        </Modal>
    );
};

export default MapModal;
