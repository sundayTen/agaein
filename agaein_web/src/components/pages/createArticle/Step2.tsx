//@ts-nocheck
import React, { useState } from 'react';
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
    FormPassword,
} from 'components/organism/Form';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useCreateArticleMutation } from 'graphql/generated/generated';

interface Step2 {
    file: string;
    breedId: string;
    name: string;
    feature: string;
    age: { year: string; month: string };
    gender: string;
    location: string;
    foundDate: string;
    lostDate: string;
    gratuity: string;
}

//TODO: 찾는 글, 발견한 글 분기 처리
const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const [create] = useCreateArticleMutation();
    const onPressButton = async () => {
        console.log('currentValue', currentValue);
        // const response = await create({
        //     variables: {
        //         boardType: match.params.type,
        //         title: 'Create Test In Web',
        //         content: 'Content',
        //         articleDetail: {
        //             breedId: '4',
        //             feature: '머리가 커요',
        //             gender: '중성',
        //             name: 'HJ',
        //             gratuity: 1000,
        //             lostDate: new Date(),
        //             foundDate: new Date(),
        //         },
        //     },
        // });
        // // TODO : Error 처리 (터지지 않도록 유도)
        // if (!!response.errors) {
        //     console.log(response.errors[0].message);
        // }
        // // TODO : 완료 로직
        // console.log(response.data?.createArticle);
        // history.push('/createArticle/step3');
    };

    const defaultValue = {
        file: '',
        breedId: '',
        name: '',
        feature: '',
        age: {
            year: '',
            month: '',
        },
        gender: 'male',
        location: '',
        foundDate: '',
        lostDate: '',
        gratuity: '',
        password: '',
    };

    const [currentValue, setCurrentValue] = useState<Step2>(defaultValue);

    function inputChangeHandler(value: any, name: string) {
        setCurrentValue((prev) => ({ ...prev, [name]: value }));
        console.log('currentValue', currentValue);
    }

    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>게시글 작성하기</Title>
            <SubTitle>상세하게 작성할수록 발견될 확률이 올라가요</SubTitle>
            <FormWrapper>
                <FormTitle>
                    실종동물 정보
                    <RequiredGuide>
                        <RequiredIcon />는 필수적으로 입력해야 할 정보입니다
                    </RequiredGuide>
                </FormTitle>
                <FormPhoto name="file" value={currentValue.file} onChange={inputChangeHandler} />
                <FormBreed name="breedId" value={currentValue.breedId} onChange={inputChangeHandler} />
                <FormDate />
                <FormAddress />
                <FormName name="name" value={currentValue.name} onChange={inputChangeHandler} />
                <FormAge name="age" value={currentValue.age} onChange={inputChangeHandler} />
                <FormGender name="gender" value={currentValue.gender} onChange={inputChangeHandler} />
                <FormEtc name="feature" value={currentValue.feature} onChange={inputChangeHandler} />
            </FormWrapper>
            {/* TODO: 비회원일 경우*/}
            <FormWrapper>
                <FormTitle>
                    게시글 관리
                    <RequiredGuide>모두 필수 입력 사항입니다.</RequiredGuide>
                </FormTitle>
                <FormPassword name="password" value={currentValue.password} onChange={inputChangeHandler} />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="돌아가기">
                    <Link to="/createArticle/step1" />
                </Button>
                <Button label="다음으로" onClick={onPressButton} disabled />
            </ButtonWrapper>
        </>
    );
};

export default Step2;
