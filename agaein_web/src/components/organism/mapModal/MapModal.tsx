import Input from 'components/molecules/Input';
import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import ReactKaKaoMap from '../ReactKakaoMap/ReactKakaoMap';
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
        setSave(false);
    }, [open]);

    useEffect(() => {
        if (save) close();
    }, [save]);
    return (
        <Modal open={open} close={close} title="장소 찾기" btnName="선택" onBtn={setSave}>
            <form className="inputForm" onSubmit={mapSearch}>
                <Input
                    style={{ width: 200 }}
                    placeholder="지역을 입력하세요"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
            </form>
            {/* <KakaoMap search={search} setAddress={setAddress} save={save} /> */}
            <ReactKaKaoMap search={search} setAddress={setAddress} save={save} />
        </Modal>
    );
};

export default MapModal;
