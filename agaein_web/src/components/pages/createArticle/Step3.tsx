import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import { RouteComponentProps } from 'react-router';
import { CreateArticleStep3Params } from 'router/params';
import { Step3ButtonGroup } from './CreateArticle.style';

const Step3 = ({ history, match }: RouteComponentProps<CreateArticleStep3Params>) => {
    return (
        <>
            <StepIndicator active={3} styles={{ marginTop: 100 }} />
            <PageTitle title="게시글 등록 완료" subTitle="입력하신 정보와 유사한 실종된 동물 리스트입니다." />
            <Step3ButtonGroup>
                <Button
                    size="XLARGE"
                    buttonStyle="PAINTED"
                    label="작성글 보기"
                    onClick={() => {
                        history.push(`/articleDetail/${match.params.id}`);
                    }}
                />
            </Step3ButtonGroup>
        </>
    );
};

export default Step3;
