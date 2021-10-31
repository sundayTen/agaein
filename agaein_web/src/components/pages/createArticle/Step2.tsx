//@ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import {
    Title,
    SubTitle,
    FormWrapper,
    FormTitle,
    RequiredGuide,
    RequiredIcon,
    ButtonWrapper,
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
    FormPassword,
} from 'components/organism/Form';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useCreateArticleMutation } from 'graphql/generated/generated';
import { UserContext } from 'contexts/userContext';

//TODO: 찾는 글, 발견한 글 분기 처리
const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const { isLoggedIn } = useContext(UserContext);
    const [create] = useCreateArticleMutation();
    const boardType = match.params.type;
    const [files, setFiles] = useState<[]>();
    const [currentArticleDetail, setCurrentArticleDetail] = useState<articleDetailInput>({
        breedId: '',
        name: '',
        feature: '',
        gender: 'male',
        location: {
            lat: '',
            lng: '',
            address: '',
            detail: '',
        },
        foundDate: '',
        age: '',
        password: '',
        alarm: false,
        lostDate: '',
        gratuity: '',
    });

    useEffect(() => {
        console.log('currentValue', files, currentArticleDetail);
    });

    const inputFilesHandler = (value: any) => {
        setFiles(value);
    };

    const inputChangeHandler = (value: any, name: string) => {
        setCurrentArticleDetail((prev) => ({ ...prev, [name]: value }));
    };

    const onPressButton = async () => {
        const response = await create({
            variables: {
                boardType: boardType,
                content: 'Content',
                files: files,
                articleDetail: currentArticleDetail,
            },
        });
        // TODO : Error 처리 (터지지 않도록 유도)
        if (!!response.errors) {
            console.log(response.errors[0].message);
        }
        // TODO : 완료 로직
        console.log(response.data?.createArticle);
        history.push('/createArticle/step3');
    };

    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>게시글 작성하기</Title>
            <SubTitle>상세하게 작성할수록 발견될 확률이 올라가요</SubTitle>
            <FormWrapper>
                <FormTitle>
                    {boardType === 'LFP' ? '실종' : '발견'}동물 정보
                    <RequiredGuide>
                        <RequiredIcon />는 필수적으로 입력해야 할 정보입니다
                    </RequiredGuide>
                </FormTitle>
                <FormPhoto type={boardType} value={files} onChange={inputFilesHandler} />
                <FormBreed name="breedId" value={currentArticleDetail.breedId} onChange={inputChangeHandler} />
                <FormDate
                    type={boardType}
                    name={boardType === 'LFP' ? 'lostDate' : 'foundDate'}
                    onChange={inputChangeHandler}
                />
                <FormAddress type={boardType} />
                <FormName name="name" value={currentArticleDetail.name} onChange={inputChangeHandler} />
                <FormAge name="age" value={currentArticleDetail.age} onChange={inputChangeHandler} />
                <FormGender name="gender" value={currentArticleDetail.gender} onChange={inputChangeHandler} />
                <FormEtc name="feature" value={currentArticleDetail.feature} onChange={inputChangeHandler} />
                {boardType === 'LFP' && (
                    <FormGratuity name="gratuity" value={currentArticleDetail.gratuity} onChange={inputChangeHandler} />
                )}
            </FormWrapper>

            <FormWrapper>
                <FormCheckbox label="입력된 정보를 바탕으로 유사한 실종견 정보를 카카오톡 알림으로 받겠습니다." />
            </FormWrapper>

            {!isLoggedIn && (
                <FormWrapper>
                    <FormTitle>
                        게시글 관리
                        <RequiredGuide>모두 필수 입력 사항입니다.</RequiredGuide>
                    </FormTitle>
                    <FormPassword name="password" value={currentArticleDetail.password} onChange={inputChangeHandler} />
                </FormWrapper>
            )}
            <ButtonWrapper>
                <Button label="돌아가기" buttonStyle="BORDER">
                    <Link to="/createArticle/step1" />
                </Button>
                <Button label="다음으로" onClick={onPressButton} buttonStyle="PAINTED" disabled />
            </ButtonWrapper>
        </>
    );
};

export default Step2;
