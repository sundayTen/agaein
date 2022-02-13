import Select from 'components/molecules/Select';
import { Font, Pagination } from 'components/molecules';
import { ContentTag } from 'components/molecules/PostItemBox/PostItemBox.style';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import { useEffect, useState } from 'react';
import { InfoHeader, InfoHeaderFont } from '../article/articleDetail/ArticleDetail.style';
import {
    AgainIcon,
    UpIcon,
    DownIcon,
    PagingContainer,
    RefreshButton,
    SearchFilter,
    SelectContainer,
    SortFilter,
} from './CrawlingResult.style';
import ResultTable from './ResultTable';
import { Breed_Type, CrawlingMutation, LocationInput, useCrawlingMutation } from 'graphql/generated/generated';

const CrawlingResultPage = () => {
    const [page, setPage] = useState(1);
    const [crawlingData, setCrawlingData] = useState<CrawlingMutation>();
    const [selectValue, setSelectValue] = useState<String>('최신순');
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const [crawling] = useCrawlingMutation();
    const type: Breed_Type = Breed_Type.Dog;
    const lostDate = '2020-02-11';
    const location: LocationInput = {
        lat: 38.124,
        lng: 38.123,
        address: '지번',
    };
    const sortFilterOptions = [
        {
            id: '최신순',
            name: '최신순',
            onClick: () => {
                setSelectValue('최신순');
            },
        },
        {
            id: '관련도순',
            name: '관련도순',
            onClick: () => {
                setSelectValue('관련도순');
            },
        },
    ];
    const getCrawlingData = async () => {
        const response = await crawling({
            variables: {
                type: type,
                lostDate: lostDate,
                location: location,
            },
        });

        if (!!response.errors) {
            console.log(response.errors[0].message);
            return;
        }

        console.log('response', response);
        if (response.data) {
            setCrawlingData(response.data);
        }
    };

    useEffect(() => {
        getCrawlingData();
    }, []);

    return (
        <>
            <PageTitle title="크롤링 검색 완료" subTitle="입력하신 정보와 관련도가 높은 실종 동물 리스트예요." />
            <SearchFilter>
                <Font label="검색 필터" fontType="label" fontWeight="bold" />
                &nbsp;
                <Font label="(4)" fontType="label" style={{ marginRight: 12, color: '#505050' }} />
                <ContentTag type="CRAWLING">
                    <Font label="강아지" fontType="tag" style={{ lineHeight: '14px' }} />
                </ContentTag>
                <RefreshButton to="/search">
                    다시 검색하기
                    <AgainIcon />
                </RefreshButton>
            </SearchFilter>
            <InfoHeader>
                <InfoHeaderFont>
                    총 <InfoHeaderFont panted>146</InfoHeaderFont>건
                </InfoHeaderFont>
                <SelectContainer
                    onClick={() => {
                        setIsSelect(!isSelect);
                    }}
                >
                    <Select name="animal" options={sortFilterOptions} optionsMinWidth="100px" optionsAbsoluteTop="30px">
                        <SortFilter>
                            <InfoHeaderFont>{selectValue}</InfoHeaderFont>
                            {isSelect ? <UpIcon /> : <DownIcon />}
                        </SortFilter>
                    </Select>
                </SelectContainer>
            </InfoHeader>
            <ResultTable crawlingData={crawlingData} />
            <PagingContainer>
                <Pagination active={page} setActive={setPage} />
            </PagingContainer>
        </>
    );
};

export default CrawlingResultPage;
