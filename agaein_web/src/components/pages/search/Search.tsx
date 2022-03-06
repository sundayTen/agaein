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
import { ButtonWrapper } from 'components/pages/createArticle/CreateArticle.style';
import Button from 'components/molecules/Button';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useState } from 'react';
import { useCrawlingMutation } from 'graphql/generated/generated';
import { useEffect } from 'react';

const Search = ({ history }: RouteComponentProps) => {
    const [crawling] = useCrawlingMutation();
    const [crawlingId, setCrawlingId] = useState<String>();
    const [currentInputData, setCurrentInputData] = useState({
        lostDate: '',
        location: {
            lat: 1,
            lng: 1,
            address: '',
        },
        keyword: [],
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
                lostDate: currentInputData?.lostDate,
                location: currentInputData?.location,
                type: "PET",
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
            <FormWrapper formTitle={'실종 동물 정보'}>
                <FormBreed name="breedId" onChange={inputChangeHandler} />
                <FormDate name="lostDate" onChange={inputChangeHandler} type="LFP" />
                <FormAddress name="location" onChange={inputChangeHandler} type="LFP" />
                <FormInput
                    name="name"
                    onChange={inputChangeHandler}
                    label="제목"
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
