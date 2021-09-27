import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CreateArticleParams } from 'router/params';
import {
    BigButton,
    ButtonFont,
    CreateArticleButtonGroup,
    CreateArticleContainer,
    CreateArticleDesc,
    CreateArticleTitle,
    NextButton,
} from './CreateArticle.style';

const CreateArticle = ({ match, history }: RouteComponentProps<CreateArticleParams>) => {
    const [selectedBtnIndex, setSelectedBtnIndex] = useState(-1);
    const onClickSelector = (index: number) => {
        setSelectedBtnIndex(index);
    };

    return (
        <CreateArticleContainer>
            <CreateArticleTitle>어떤 서비스를 이용하실 건가요?</CreateArticleTitle>
            <CreateArticleDesc>카테고리를 선택하여 게시글을 작성할 수 있습니다</CreateArticleDesc>
            <CreateArticleButtonGroup>
                <BigButton onClick={() => onClickSelector(0)} color={selectedBtnIndex === 0 ? '#0038ff' : 'white'}>
                    <ButtonFont>찾고 있어요!</ButtonFont>
                </BigButton>
                <BigButton onClick={() => onClickSelector(1)} color={selectedBtnIndex === 1 ? '#0038ff' : 'white'}>
                    <ButtonFont>발견 했어요!</ButtonFont>
                </BigButton>
            </CreateArticleButtonGroup>
            <NextButton>다음으로</NextButton>
        </CreateArticleContainer>
    );
};

export default CreateArticle;
