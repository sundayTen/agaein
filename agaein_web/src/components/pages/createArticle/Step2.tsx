//@ts-nocheck
import React, { useState, useEffect, useContext, useMemo } from 'react';
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
    FormPassword,
} from 'components/organism/Form';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useCreateArticleMutation } from 'graphql/generated/generated';
import { UserContext } from 'contexts/userContext';

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
    const [isCheckRequried, setIsCheckRequried] = useState(false);

    const boardTitle = boardType === 'LFP' ? '실종' : '발견';
    const dateType = boardType === 'LFP' ? 'lostDate' : 'foundDate';

    const isInvalid = useMemo<boolean>(() => {
        const isFiles = files?.length;
        const date = dateType;
        const isAddress = currentArticleDetail.location.address && currentArticleDetail.location.detail;

        return (
            !isFiles || !currentArticleDetail.breedId || !currentArticleDetail[date] || !isAddress
            // !(!isLoggedIn && isCheckRequried && currentArticleDetail.password)
        );
    }, [currentArticleDetail, files, isCheckRequried]);

    const handleGoBack = () => {
        history.goBack();
    };

    const inputFilesHandler = (value: any) => {
        setFiles(value);
    };

    const inputChangeHandler = (value: any, name: string) => {
        setCurrentArticleDetail((prev) => ({ ...prev, [name]: value }));
    };

    const requiredCheckHandler = (value: any, name: string) => {
        setIsCheckRequried(value);
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
                <FormPhoto type={boardType} onChange={inputFilesHandler} />
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name={dateType} type={boardType} onChange={inputChangeHandler} />
                <FormAddress name="location" type={boardType} onChange={inputChangeHandler} />
                <FormName name="name" value={currentArticleDetail.name} onChange={inputChangeHandler} />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" value={currentArticleDetail.gender} onChange={inputChangeHandler} />
                <FormEtc name="feature" value={currentArticleDetail.feature} onChange={inputChangeHandler} />
                {boardType === 'LFP' && (
                    <FormGratuity name="gratuity" value={currentArticleDetail.gratuity} onChange={inputChangeHandler} />
                )}
            </FormWrapper>

            <FormWrapper>
                <FormTitle>
                    게시글 관리
                    <RequiredGuide>
                        <RequiredIcon />는 필수 입력 사항입니다.
                    </RequiredGuide>
                </FormTitle>

                {/* TODO: email value 추가후 추가 */}
                {/* <FormEmail name="email" value={currentArticleDetail.email} onChange={inputChangeHandler} /> */}

                {!isLoggedIn && (
                    <FormPassword name="password" value={currentArticleDetail.password} onChange={inputChangeHandler} />
                )}

                <CheckWrapper>
                    <FormCheckbox
                        name="alarm"
                        label="입력된 정보를 바탕으로 유사한 실종견 정보를 카카오톡 알림으로 받겠습니다."
                        value={currentArticleDetail.alarm}
                        onChange={inputChangeHandler}
                    />
                    <FormCheckbox
                        name="requiredCheck"
                        label="비회원으로 게시글 작성 시 실종 동물 발견 알림을 받지 못합니다. 알림을 받길 원하시면 로그인해 주세요."
                        value={isCheckRequried}
                        onChange={requiredCheckHandler}
                        required
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
