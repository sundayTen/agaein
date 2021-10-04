import { Title, FormWrapper, Fieldset, FieldsetTitle, ButtonWrapper, BackButton } from './CreateArticle.style';
import {
    FormName,
    FormPhone,
    FormPhoto,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormEtc,
} from 'components/organism/createArticle';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import MapModal from 'components/organism/mapModal/MapModal';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//TODO: 찾는 글, 발견한 글 분기 처리
const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    console.log(match.params.type);
    const closeModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>상세하게 작성할수록 발견될 확률이 높아져요!</Title>
            <FormWrapper>
                <Fieldset>
                    <FieldsetTitle>나의 정보</FieldsetTitle>
                    <FormName />
                    <FormPhone />
                </Fieldset>
                <Fieldset>
                    <FieldsetTitle>
                        실종동물 정보
                        <span>*는 필수적으로 입력해야 할 정보입니다</span>
                    </FieldsetTitle>
                    <FormPhoto />
                    <FormAddress />
                    <FormDate />
                    <FormName />
                    <FormBreed />
                    <FormAge />
                    <FormGender />
                    <FormEtc />
                </Fieldset>
            </FormWrapper>
            <ButtonWrapper>
                <BackButton>
                    <Link to="/createArticle/step1">
                        <span className="blind">이전</span>
                        {/* TODO: 아이콘으로 변경 */}
                        &lt;
                    </Link>
                </BackButton>
                <Button
                    label="등록"
                    onClick={() => {
                        history.push('/createArticle/step3');
                    }}
                />
            </ButtonWrapper>
            <MapModal open={openModal} close={closeModal} setAddress={setAddress} />
        </>
    );
};

export default Step2;
