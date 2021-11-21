import PageTitle from 'components/organism/PageTitle/PageTitle';
import {
    FormInput,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormWrapper,
} from 'components/organism/Form';
import { ButtonWrapper } from 'components/pages/createArticle/CreateArticle.style';
import Button from 'components/molecules/Button';
import { RouteComponentProps } from 'react-router-dom';

const Search = ({ history }: RouteComponentProps) => {
    const handleGoBack = () => {
        history.goBack();
    };

    const inputChangeHandler = () => {};

    return (
        <>
            <PageTitle title={'크롤링 검색 정보'} subTitle={'상세하게 작성할수록 발견될 확률이 올라가요'} />
            <FormWrapper formTitle={'실종 동물 정보'}>
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name="lostDate" onChange={inputChangeHandler} type="LFP" />
                <FormAddress name="address" onChange={inputChangeHandler} type="LFP" />
                <FormInput
                    name="name"
                    onChange={inputChangeHandler}
                    label="제목"
                    placeholder="동물 이름을 입력해주세요"
                />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" onChange={inputChangeHandler} />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="돌아가기" buttonStyle="BORDER" onClick={handleGoBack} />
                <Button label="다음으로" buttonStyle="PAINTED" onClick={() => {}} disabled={true} />
            </ButtonWrapper>
        </>
    );
};

export default Search;
