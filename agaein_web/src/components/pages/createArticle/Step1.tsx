import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { Board_Type } from 'graphql/generated/generated';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CreateArticleStep1Params } from 'router/params';
import {
    BigButton,
    ButtonFont,
    CreateArticleButtonGroup,
    CreateArticleContainer,
    CreateArticleDesc,
    CreateArticleTitle,
} from './CreateArticle.style';

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
    const buttonStatus = () => {
        return isButtonDisabled() ? 'DISABLED' : 'PAINTED';
    };

    return (
        <CreateArticleContainer>
            <StepIndicator active={1} />
            <CreateArticleTitle>어떤 서비스를 이용하실 건가요?</CreateArticleTitle>
            <CreateArticleDesc>카테고리를 선택하여 게시글을 작성할 수 있습니다</CreateArticleDesc>
            <CreateArticleButtonGroup>
                {/* TODO : Button 컴포넌트로 대체 */}
                <BigButton onClick={() => onClickSelector(0)} active={selectedBtnIndex === 0}>
                    <ButtonFont active={selectedBtnIndex === 0}>찾고 있어요</ButtonFont>
                </BigButton>
                <BigButton onClick={() => onClickSelector(1)} active={selectedBtnIndex === 1}>
                    <ButtonFont active={selectedBtnIndex === 1}>발견 했어요</ButtonFont>
                </BigButton>
            </CreateArticleButtonGroup>
            <Button status={buttonStatus()} label="다음으로" onClick={onClickNext} />
        </CreateArticleContainer>
    );
};

export default CreateArticle;
