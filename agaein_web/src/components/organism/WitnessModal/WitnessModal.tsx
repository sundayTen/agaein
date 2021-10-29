import Modal from 'components/molecules/Modal';
import { useEffect, useState } from 'react';
import ReactKaKaoMap from '../ReactKakaoMap/ReactKakaoMap';
import WitnessList from './WitnessList/WitnessList';
import { ImgToggleButton, MapToggleButton } from './WitnessModel.style';
import WitnessImageCarousel from './WitnessImageCarousel';
interface WitnessModalProps {
    open: boolean;
    close: () => void;
    setAddress: (value: string) => void;
}
const imgDummy = [
    'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    'https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg',
    'https://images.mypetlife.co.kr/content/uploads/2019/09/09153001/dog-panting-1024x683.jpg',
];
const WitnessModal = ({ open, close, setAddress }: WitnessModalProps) => {
    const [witnessToggle, setWitnessToggle] = useState('');
    return (
        <Modal open={open} close={close} title="발견 리스트">
            <MapToggleButton label="지도보기" onClick={() => setWitnessToggle('지도')} />
            <ImgToggleButton label="사진보기" onClick={() => setWitnessToggle('사진')} />
            {witnessToggle === '지도' ? (
                <ReactKaKaoMap setAddress={setAddress} size={{ width: 580, height: 400 }} />
            ) : (
                <WitnessImageCarousel images={imgDummy} />
            )}
            <WitnessList />
        </Modal>
    );
};

export default WitnessModal;
