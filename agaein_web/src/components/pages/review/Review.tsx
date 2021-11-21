import PageTitle from 'components/organism/PageTitle/PageTitle';
import { FormPhoto, FormInput, FormTextarea, FormWrapper } from 'components/organism/Form';
import { ButtonWrapper } from 'components/pages/createArticle/CreateArticle.style';
import Button from 'components/molecules/Button';
import { RouteComponentProps } from 'react-router-dom';

const Review = ({ history }: RouteComponentProps) => {
    const handleGoBack = () => {
        history.goBack();
    };

    const inputChangeHandler = () => {};

    return (
        <>
            <PageTitle title={'후기 작성하기'} subTitle={'감사의 마음을 담은 따뜻한 후기를 남겨주세요'} />
            <FormWrapper formTitle={'후기 작성'}>
                <FormPhoto onChange={inputChangeHandler} type="REVIEW" />
                <FormInput name="title" onChange={inputChangeHandler} label="이름" placeholder="제목을 입력해주세요" />
                <FormTextarea name="content" onChange={inputChangeHandler} placeholder="내용을 입력해주세요" />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="다음으로" buttonStyle="PAINTED" onClick={() => {}} disabled={true} />
            </ButtonWrapper>
        </>
    );
};

export default Review;
