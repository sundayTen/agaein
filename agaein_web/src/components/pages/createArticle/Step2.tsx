import { useState, useContext, useMemo, useEffect } from 'react';
import { ButtonWrapper, CheckWrapper } from './CreateArticle.style';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import {
    FormInput,
    FormPhoto,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormTextarea,
    FormGratuity,
    FormCheckbox,
    FormEmail,
    FormKeyword,
    FormPassword,
    FormWrapper,
} from 'components/organism/Form';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps } from 'react-router-dom';
import { ArticleDetailInput } from 'graphql/generated/generated';
import { UserContext } from 'contexts/userContext';
import { isArticleDetail } from 'utils/typeGuards';
import useArticle from 'graphql/hooks/useArticle';

const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const { isLoggedIn } = useContext(UserContext);
    const { createArticle } = useArticle();
    const boardType = match.params.type;
    const [files, setFiles] = useState<[]>([]);
    const [currentArticleDetail, setCurrentArticleDetail] = useState<ArticleDetailInput>({});
    const [isValidEmail, setIsValidEmail] = useState(false);

    const boardTitle = boardType === 'LFP' ? '실종' : '발견';
    const dateType = boardType === 'LFP' ? 'lostDate' : 'foundDate';

    const isFiles = () => {
        return files?.length;
    };

    const needPassword = () => {
        return isLoggedIn ? true : currentArticleDetail.password;
    };

    useEffect(() => {
        if (!!currentArticleDetail.email) {
            setIsValidEmail(validateEmail(currentArticleDetail.email));
        }
    }, [currentArticleDetail]);

    const validateEmail = (email: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    const isInvalid = useMemo<boolean>(() => {
        return !isFiles() || !isArticleDetail(currentArticleDetail, dateType) || !needPassword();
    }, [currentArticleDetail, files]);

    const handleGoBack = () => {
        history.goBack();
    };

    const inputFilesHandler = (value: any) => {
        setFiles(value);
    };

    const inputChangeHandler = (value: any, name: string) => {
        setCurrentArticleDetail({
            ...currentArticleDetail,
            [name]: value,
        });
    };

    const onPressButton = async () => {
        createArticle({
            boardType,
            files,
            articleDetail: currentArticleDetail,
        }).then((response) => history.push(`/createArticle/step3/${response.data?.createArticle.id}`));
    };

    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <PageTitle title="게시글 작성하기" subTitle="상세하게 작성할수록 발견될 확률이 올라가요" />
            <FormWrapper formTitle={boardTitle + '동물 정보'}>
                <FormPhoto onChange={inputFilesHandler} type={boardType} />
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name={dateType} onChange={inputChangeHandler} type={boardType} />
                <FormAddress name="location" onChange={inputChangeHandler} type={boardType} />
                <FormInput
                    name="name"
                    onChange={inputChangeHandler}
                    label="이름"
                    placeholder="동물 이름을 입력해주세요"
                />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" onChange={inputChangeHandler} />
                <FormTextarea name="feature" onChange={inputChangeHandler} placeholder="그 외 특징을 작성해주세요" />
                <FormKeyword name="keyword" onChange={inputChangeHandler} />
                {boardType === 'LFP' && <FormGratuity name="gratuity" onChange={inputChangeHandler} />}
            </FormWrapper>
            <FormWrapper formTitle={'게시글 관리'}>
                <FormEmail name="email" onChange={inputChangeHandler} />
                {!isLoggedIn && <FormPassword name="password" onChange={inputChangeHandler} />}
                <CheckWrapper>
                    <FormCheckbox
                        name="alarm"
                        label="입력된 정보를 바탕으로 유사한 실종견 정보를 이메일로 수신하겠습니다."
                        onChange={inputChangeHandler}
                        disabled={!isValidEmail}
                    />
                </CheckWrapper>
            </FormWrapper>
            <ButtonWrapper>
                <Button label="돌아가기" buttonStyle="BORDER" onClick={handleGoBack} />
                <Button label="다음으로" buttonStyle="PAINTED" onClick={onPressButton} disabled={isInvalid} />
            </ButtonWrapper>
        </>
    );
};

export default Step2;
