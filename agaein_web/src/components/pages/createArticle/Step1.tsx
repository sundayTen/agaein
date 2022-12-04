import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import SEO from 'components/molecules/SEO';
import StepIndicator from 'components/molecules/StepIndicator';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import { Board_Type } from 'graphql/generated/generated';
import useHover from 'hooks/useHover';
import { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CreateArticleStep1Params } from 'router/params';
import { BigButton, Step1ButtonGroup, Step1Container, UtilButtonGroup } from './CreateArticle.style';
import Step1ButtonImage from './Step1ButtonImage';

const Step1 = ({ history }: RouteComponentProps<CreateArticleStep1Params>) => {
    const [selectedBtnIndex, setSelectedBtnIndex] = useState(-1);
    const button1Ref = useRef<HTMLButtonElement>(null);
    const button2Ref = useRef<HTMLButtonElement>(null);
    const isButton1Hover = useHover(button1Ref);
    const isButton2Hover = useHover(button2Ref);

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
            <SEO
                title="게시글 작성하기"
                description="어개인 홈"
                keywords="동물, 유기동물 찾기, 유기동물"
                url="https://www.agaein.com/createArticle/step1"
            />
            <Step1Container>
                <StepIndicator active={1} />
                <PageTitle title="카테고리 선택하기" subTitle="목적에 맞는 카테고리를 선택해주세요" />
                <Step1ButtonGroup>
                    <BigButton ref={button1Ref} onClick={() => onClickSelector(0)} active={selectedBtnIndex === 0}>
                        <Step1ButtonImage active={isButton1Hover || selectedBtnIndex === 0} type="lost" />
                        <Font label="찾고 있어요!" fontType="h3" fontWeight="bold" status="ACTIVE" />
                    </BigButton>
                    <BigButton ref={button2Ref} onClick={() => onClickSelector(1)} active={selectedBtnIndex === 1}>
                        <Step1ButtonImage active={isButton2Hover || selectedBtnIndex === 1} type="found" />
                        <Font label="발견 했어요!" fontType="h3" fontWeight="bold" status="ACTIVE" />
                    </BigButton>
                </Step1ButtonGroup>
                <UtilButtonGroup>
                    <Button buttonStyle="BORDER" label="돌아가기" onClick={() => history.goBack()} />
                    <Button
                        buttonStyle="PAINTED"
                        label="다음으로"
                        onClick={onClickNext}
                        disabled={isButtonDisabled()}
                    />
                </UtilButtonGroup>
            </Step1Container>
        </>
    );
};

export default Step1;
