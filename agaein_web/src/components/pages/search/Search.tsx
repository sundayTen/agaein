import PageTitle from 'components/organism/PageTitle/PageTitle';
import {
    FormInput,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormWrapper,
    FormKeyword,
} from 'components/organism/Form';
import {
    ButtonWrapper,
    ToggleWrap,
    ToggleLabel,
    ToggleInput,
    ToggleText,
} from 'components/pages/createArticle/CreateArticle.style';
import Button from 'components/molecules/Button';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useState } from 'react';
import { Finding_Type, useCrawlingMutation } from 'graphql/generated/generated';
import { useEffect } from 'react';

const Search = ({ history }: RouteComponentProps) => {
    const [crawling] = useCrawlingMutation();
    const [crawlingId, setCrawlingId] = useState<String>();
    const [currentInputData, setCurrentInputData] = useState({
        breedId: '3',
        lostDate: undefined,
        location: {
            lat: 1,
            lng: 1,
            address: '',
        },
        name: undefined,
        age: undefined,
        gender: undefined,
        keyword: [],
        type: Finding_Type.Pet,
    });

    const handleGoBack = () => {
        history.goBack();
    };

    const inputChangeHandler = (value: any, name: string) => {
        setCurrentInputData({
            ...currentInputData,
            [name]: value,
        });
    };

    const getCrawlingData = async () => {
        const response = await crawling({
            variables: {
                breedId: currentInputData?.breedId,
                lostDate: currentInputData?.lostDate,
                location: currentInputData?.location,
                name: currentInputData?.name,
                age: currentInputData?.age,
                gender: currentInputData?.gender,
                keywords: currentInputData?.keyword,
                type: currentInputData?.type,
            },
        });

        if (!!response.errors) {
            console.log(response.errors[0].message);
            return;
        }

        if (response.data) {
            setCrawlingId(response.data.crawling);
        }
    };

    useEffect(() => {
        if (crawlingId) {
            history.push(`/crawlingResult/${crawlingId}/${currentInputData.keyword}`);
        }
    }, [crawlingId]);

    return (
        <>
            <PageTitle title="크롤링 검색 정보" subTitle="상세하게 작성할수록 발견될 확률이 올라가요" />
            <ToggleWrap>
                <ToggleLabel>
                    <ToggleInput className="toggle-left" type="radio" name="toggle" checked />
                    <ToggleText>실종동물 찾아요</ToggleText>
                </ToggleLabel>
                <ToggleLabel>
                    <ToggleInput className="toggle-right" type="radio" name="toggle" />
                    <ToggleText>주인을 찾아요</ToggleText>
                </ToggleLabel>
            </ToggleWrap>
            <FormWrapper formTitle={'실종 동물 정보'}>
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name="lostDate" onChange={inputChangeHandler} type="LFP" />
                <FormAddress name="location" onChange={inputChangeHandler} type="LFP" />
                <FormInput
                    name="name"
                    onChange={inputChangeHandler}
                    label="이름"
                    placeholder="동물 이름을 입력해주세요"
                />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" onChange={inputChangeHandler} />
                <FormKeyword name="keyword" onChange={inputChangeHandler} />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="돌아가기" buttonStyle="BORDER" onClick={handleGoBack} style={{ marginRight: 20 }} />
                <Button
                    label="다음으로"
                    buttonStyle="PAINTED"
                    onClick={() => {
                        getCrawlingData();
                    }}
                    disabled={currentInputData.lostDate === '' || currentInputData.location.address === ''}
                />
            </ButtonWrapper>
        </>
    );
};

export default Search;
