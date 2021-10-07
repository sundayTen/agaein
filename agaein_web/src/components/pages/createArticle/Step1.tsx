import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import StepIndicator from 'components/molecules/StepIndicator';
import { Board_Type } from 'graphql/generated/generated';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CreateArticleStep1Params } from 'router/params';
import { BigButton, Step1ButtonGroup, Step1Container, Step1Headers } from './CreateArticle.style';

const CreateArticle = ({ history }: RouteComponentProps<CreateArticleStep1Params>) => {
    const [selectedBtnIndex, setSelectedBtnIndex] = useState(-1);

    const getBoardType = () => {
        return selectedBtnIndex === 0 ? Board_Type.Lfp : Board_Type.Lfg;
    };
    const onClickSelector = (index: number) => {
        setSelectedBtnIndex(index);
    };
    const onClickNext = () => {
        history.push(`/createArticle/step2/${getBoardType()}`);
    };
    const isButtonDisabled = () => {
        return selectedBtnIndex < 0;
    };

    return (
        <>
            <Step1Container>
                <StepIndicator active={1} />
                <Step1Headers>
                    <Font label="카테고리 선택하기" fontType="h2" fontWeight="bold" style={{ marginBottom: 12 }} />
                    <Font label="목적에 맞는 카테고리를 선택해주세요" fontType="h3" fontWeight="normal" />
                </Step1Headers>
                <Step1ButtonGroup>
                    {/* TODO : Button 컴포넌트로 대체 */}
                    <BigButton onClick={() => onClickSelector(0)} active={selectedBtnIndex === 0}>
                        <Font label="찾고 있어요!" fontType="h3" fontWeight="bold" status="ACTIVE" />
                    </BigButton>
                    <BigButton onClick={() => onClickSelector(1)} active={selectedBtnIndex === 1}>
                        <Font label="발견 했어요!" fontType="h3" fontWeight="bold" status="ACTIVE" />
                    </BigButton>
                </Step1ButtonGroup>
                <Button buttonStyle="PAINTED" label="다음으로" onClick={onClickNext} disabled={isButtonDisabled()} />
            </Step1Container>
        </>
    );
};

export default CreateArticle;
