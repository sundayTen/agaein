import { useState, useContext, useMemo } from 'react';
import {
    Title,
    SubTitle,
    FormWrapper,
    FormTitle,
    RequiredGuide,
    RequiredIcon,
    ButtonWrapper,
    CheckWrapper,
} from './CreateArticle.style';
import {
    FormName,
    FormPhoto,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormEtc,
    FormGratuity,
    FormCheckbox,
    FormEmail,
    FormKeyword,
    FormPassword,
} from 'components/organism/Form';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useCreateArticleMutation, ArticleDetailInput } from 'graphql/generated/generated';
import { UserContext } from 'contexts/userContext';
import { isArticleDetail } from 'utils/typeGuards';

const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const { isLoggedIn } = useContext(UserContext);
    const [create] = useCreateArticleMutation();
    const boardType = match.params.type;
    const [files, setFiles] = useState<[]>();
    const [currentArticleDetail, setCurrentArticleDetail] = useState<ArticleDetailInput>({});

    const boardTitle = boardType === 'LFP' ? '실종' : '발견';
    const dateType = boardType === 'LFP' ? 'lostDate' : 'foundDate';

    const isFiles = () => {
        return files?.length;
    };

    const needPassword = () => {
        return isLoggedIn ? true : currentArticleDetail.password;
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
        const response = await create({
            variables: {
                boardType: boardType,
                files: files,
                articleDetail: currentArticleDetail,
            },
        });

        if (!!response.errors) {
            console.log(response.errors[0].message);
            return;
        }

        // TODO : 완료 로직
        console.log('response', response);
        history.push('/createArticle/step3');
    };

    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>게시글 작성하기</Title>
            <SubTitle>상세하게 작성할수록 발견될 확률이 올라가요</SubTitle>
            <FormWrapper>
                <FormTitle>
                    {boardTitle}동물 정보
                    <RequiredGuide>
                        <RequiredIcon />는 필수 입력 사항입니다.
                    </RequiredGuide>
                </FormTitle>
                <FormPhoto onChange={inputFilesHandler} type={boardType} />
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name={dateType} onChange={inputChangeHandler} type={boardType} />
                <FormAddress name="location" onChange={inputChangeHandler} type={boardType} />
                <FormName name="name" onChange={inputChangeHandler} />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" onChange={inputChangeHandler} />
                <FormEtc name="feature" onChange={inputChangeHandler} />
                <FormKeyword name="keyword" onChange={inputChangeHandler} />
                {boardType === 'LFP' && <FormGratuity name="gratuity" onChange={inputChangeHandler} />}
            </FormWrapper>

            <FormWrapper>
                <FormTitle>
                    게시글 관리
                    <RequiredGuide>
                        <RequiredIcon />는 필수 입력 사항입니다.
                    </RequiredGuide>
                </FormTitle>

                <FormEmail name="email" onChange={inputChangeHandler} />

                {!isLoggedIn && <FormPassword name="password" onChange={inputChangeHandler} />}

                <CheckWrapper>
                    <FormCheckbox
                        name="alarm"
                        label="입력된 정보를 바탕으로 유사한 실종견 정보를 이메일로 수신하겠습니다."
                        onChange={inputChangeHandler}
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
