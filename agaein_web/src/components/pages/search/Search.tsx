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
import { RouteComponentProps } from 'react-router-dom';
import { useState } from 'react';
import { Finding_Type, useCrawlingMutation } from 'graphql/generated/generated';
import { useEffect } from 'react';

const Search = ({ history }: RouteComponentProps) => {
    const [crawling] = useCrawlingMutation();
    const [crawlingId, setCrawlingId] = useState<String>();
    const [currentInputData, setCurrentInputData] = useState({
        breedId: '3',
        foundOrLostDate: undefined,
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
                foundOrLostDate: currentInputData?.foundOrLostDate,
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
            <PageTitle title="????????? ?????? ??????" subTitle="???????????? ??????????????? ????????? ????????? ????????????" />
            <ToggleWrap>
                <ToggleLabel>
                    <ToggleInput className="toggle-left" type="radio" name="toggle" checked />
                    <ToggleText>???????????? ?????????</ToggleText>
                </ToggleLabel>
                <ToggleLabel>
                    <ToggleInput className="toggle-right" type="radio" name="toggle" />
                    <ToggleText>????????? ?????????</ToggleText>
                </ToggleLabel>
            </ToggleWrap>
            <FormWrapper formTitle={'?????? ?????? ??????'}>
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name="foundOrLostDate" onChange={inputChangeHandler} type="LFP" />
                <FormAddress name="location" onChange={inputChangeHandler} type="LFP" />
                <FormInput
                    name="name"
                    onChange={inputChangeHandler}
                    label="??????"
                    placeholder="?????? ????????? ??????????????????"
                />
                <FormAge name="age" onChange={inputChangeHandler} />
                <FormGender name="gender" onChange={inputChangeHandler} />
                <FormKeyword name="keyword" onChange={inputChangeHandler} />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="????????????" buttonStyle="BORDER" onClick={handleGoBack} style={{ marginRight: 20 }} />
                <Button
                    label="????????????"
                    buttonStyle="PAINTED"
                    onClick={() => {
                        getCrawlingData();
                    }}
                    disabled={currentInputData.foundOrLostDate === '' || currentInputData.location.address === ''}
                />
            </ButtonWrapper>
        </>
    );
};

export default Search;
