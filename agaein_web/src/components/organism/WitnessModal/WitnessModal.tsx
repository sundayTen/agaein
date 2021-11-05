import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import ReactKaKaoMap from '../ReactKakaoMap/ReactKakaoMap';
import WitnessList from './WitnessList/WitnessList';
import { ImgToggleButton, MapToggleButton } from './WitnessModel.style';
import WitnessImageCarousel from './WitnessImageCarousel';
import WithessReport from './WithessReport/WithessReport';
interface WitnessModalProps {
    open: boolean;
    close: () => void;
    author: boolean;
}
const imgDummy = [
    'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    'https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg',
    'https://images.mypetlife.co.kr/content/uploads/2019/09/09153001/dog-panting-1024x683.jpg',
];
const WitnessModal = ({ open, close, author = false }: WitnessModalProps) => {
    const [witnessToggle, setWitnessToggle] = useState<'지도' | '사진'>('지도');
    const [save, setSave] = useState(false);
    const [address, setAddress] = useState('');

    const witnessSave = () => {
        setSave(true);
    };

    return (
        <Modal
            open={open}
            close={close}
            title="발견 리스트"
            btnName={author ? undefined : '등록'}
            onBtn={author ? undefined : witnessSave}
        >
            <div>
                {author && (
                    <div style={{ height: 30 }}>
                        <ImgToggleButton click={witnessToggle === '사진'} onClick={() => setWitnessToggle('사진')}>
                            사진보기
                        </ImgToggleButton>
                        <MapToggleButton click={witnessToggle === '지도'} onClick={() => setWitnessToggle('지도')}>
                            지도보기
                        </MapToggleButton>
                    </div>
                )}
                {witnessToggle === '지도' ? (
                    <ReactKaKaoMap setAddress={setAddress} size={{ width: 580, height: 400 }} category={true} />
                ) : (
                    <WitnessImageCarousel images={imgDummy} />
                )}
                {author ? <WitnessList /> : <WithessReport address={address} />}
            </div>
        </Modal>
    );
};

export default WitnessModal;
