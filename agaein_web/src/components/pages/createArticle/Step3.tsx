import Button from 'components/molecules/Button';
import SEO from 'components/molecules/SEO';
import StepIndicator from 'components/molecules/StepIndicator';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import { RouteComponentProps } from 'react-router';
import { CreateArticleStep3Params } from 'router/params';
import { Step3ButtonGroup } from './CreateArticle.style';

const Step3 = ({ history, match }: RouteComponentProps<CreateArticleStep3Params>) => {
    return (
        <>
            <SEO
                title="게시글 작성하기"
                description="어개인 홈"
                keywords="동물, 유기동물 찾기, 유기동물"
                url="https://www.agaein.com/createArticle/step3"
            />
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
