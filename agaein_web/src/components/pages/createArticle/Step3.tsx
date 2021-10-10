import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import StepIndicator from 'components/molecules/StepIndicator';
import { RouteComponentProps } from 'react-router';
import { ArticleListParams } from 'router/params';
import { Step1Headers, Title } from './CreateArticle.style';

const Step3 = ({ history, match }: RouteComponentProps<ArticleListParams>) => {
    return (
        <div>
            <StepIndicator active={3} styles={{ marginTop: 100 }} />
            <Step1Headers>
                <Font label="등록이 완료됐습니다!" fontType="h2" fontWeight="bold" style={{ marginBottom: 12 }} />
                <Font
                    style={{ marginBottom: 30 }}
                    label="작성된 정보와 유사한 실종동물 리스트 입니다."
                    fontType="h3"
                    fontWeight="normal"
                />
                <Button size="LARGE" label="작성글 보기" onClick={() => {}} />
            </Step1Headers>
        </div>
    );
};

export default Step3;
