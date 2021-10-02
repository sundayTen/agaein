import {
    Title,
    FormWrapper,
    Fieldset,
    FormRow,
    Label,
    CheckboxWrapper,
    Checkbox,
    ButtonWrapper,
} from './CreateArticle.style';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps } from 'react-router-dom';
import MapModal from 'components/organism/mapModal/MapModal';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    type dateType = Date | null;
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    console.log(match.params.type);

    const modalClose = () => {
        setOpenModal(false);
    };
    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>상세하게 작성될수록 발견될 확률이 올라가요!</Title>
            <FormWrapper>
                <Fieldset>
                    <strong>나의 정보</strong>
                    <FormRow>
                        <Label>이름</Label>
                        <div>
                            <label>
                                <Input type="text" placeholder="홍길동" />
                            </label>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>연락처</Label>
                        <div>
                            <label>
                                <Input type="tel" placeholder="" />
                            </label>
                            -
                            <label>
                                <Input type="tel" placeholder="" />
                            </label>
                            -
                            <label>
                                <Input type="tel" placeholder="" />
                            </label>
                        </div>
                    </FormRow>
                </Fieldset>
                <Fieldset>
                    <strong>
                        실종동물 정보
                        <span>*는 필수적으로 입력해야 할 정보입니다</span>
                    </strong>
                    <FormRow>
                        <Label>실종동물 사진*</Label>
                        <label>
                            <Input type="file" />
                        </label>
                        <p>
                            <b>파일 형식</b> jpeg 또는 png 확장자의 이미지를 5mb 이하의 크기로 업로드해주세요.
                        </p>
                    </FormRow>
                    <FormRow>
                        <Label>실종지역*</Label>
                        <div>
                            <div>
                                <label>
                                    <Input
                                        type="text"
                                        placeholder="지역명"
                                        onClick={() => {
                                            setOpenModal(true);
                                        }}
                                        value={address}
                                        readOnly
                                    />
                                </label>
                            </div>
                            <label>
                                <Input type="text" placeholder="세부 장소" />
                            </label>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>실종일*</Label>
                        <div>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                            />
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>동물 이름</Label>
                        <div>
                            <label>
                                <Input type="text" />
                            </label>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>동물 종류</Label>
                        <div>
                            <select name="pet">
                                <option value="dog">개</option>
                            </select>
                            <select name="pet-kind">
                                <option value="retriever">골든리트리버</option>
                            </select>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>나이</Label>
                        <div>
                            <div>
                                <label>
                                    <Input type="text" />
                                </label>
                                살
                            </div>
                            <div>
                                <label>
                                    <Input type="text" />
                                </label>
                                개월
                            </div>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>성별</Label>
                        <div>
                            <label>
                                <Input type="radio" name="gender" value="male" />
                                남자
                            </label>
                            <label>
                                <Input type="radio" name="gender" value="femail" />
                                여자
                            </label>
                            <label>
                                <Input type="radio" name="gender" value="unknown" />
                                모름
                            </label>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>그 외 특징</Label>
                        <div>
                            <textarea placeholder="내용을 입력해주세요" />
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label>사례금</Label>
                        <div>
                            <label>
                                <Input type="text" />
                            </label>
                        </div>
                    </FormRow>
                </Fieldset>
            </FormWrapper>
            <CheckboxWrapper>
                <Checkbox>
                    <Input type="checkbox" className="blind" />
                    입력된 정보를 바탕으로 유사한 실종견 정보를 카카오톡 알림으로 받겠습니다.
                </Checkbox>
            </CheckboxWrapper>
            <ButtonWrapper>
                <a href="#">
                    <span className="blind">이전</span>
                </a>
                <Button
                    label="등록"
                    onClick={() => {
                        history.push('/createArticle/step3');
                    }}
                />
            </ButtonWrapper>
            <MapModal open={openModal} close={modalClose} setAddress={setAddress} />
        </>
    );
};

export default Step2;
