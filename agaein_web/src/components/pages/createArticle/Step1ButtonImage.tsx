import FoundActive from 'assets/image/found_active.png';
import FoundInActive from 'assets/image/found_inactive.png';
import LostActive from 'assets/image/lost_active.png';
import LostInActive from 'assets/image/lost_inactive.png';
import { Step1Image } from './CreateArticle.style';

type Step1ButtonType = 'lost' | 'found';
interface Step1ButtonProps {
    active: boolean;
    type: Step1ButtonType;
}

const getSrc = ({ type, active }: Step1ButtonProps) => {
    if (type === 'lost') {
        return active ? LostActive : LostInActive;
    }
    return active ? FoundActive : FoundInActive;
};

const Step1ButtonImage = (props: Step1ButtonProps) => {
    return <Step1Image src={getSrc(props)} alt="동물,주인 찾기 폼 생성 버튼" />;
};

export default Step1ButtonImage;
