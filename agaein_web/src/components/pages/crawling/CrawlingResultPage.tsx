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
import { useCrawlingResultsQuery } from 'graphql/generated/generated';
import { RouteComponentProps } from 'react-router-dom';
import { CrawlingResultParams } from 'router/params';

const CrawlingResultPage = ({ match, history }: RouteComponentProps<CrawlingResultParams>) => {
    const { id, keyword } = match.params;
    const keywords = keyword?.split(',');
    const keywordsLabel = keyword ? '(' + keywords.length + ')' : '(0)';
    const [page, setPage] = useState(1);
    const [selectValue, setSelectValue] = useState<String>('최신순');
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { data, loading, error } = useCrawlingResultsQuery({
        variables: {
            id,
        },
    });

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

    return (
        <>
            <PageTitle title="크롤링 검색 완료" subTitle="입력하신 정보와 관련도가 높은 실종 동물 리스트예요." />
            <SearchFilter>
                <Font label="검색 필터" fontType="label" fontWeight="bold" />
                &nbsp;
                <Font label={keywordsLabel} fontType="label" style={{ marginRight: 12, color: '#505050' }} />
                {keywords?.map((item) => {
                    return (
                        <ContentTag type="CRAWLING">
                            <Font label={item} fontType="tag" style={{ lineHeight: '14px' }} />
                        </ContentTag>
                    );
                })}
                <RefreshButton to="/search">
                    다시 검색하기
                    <AgainIcon />
                </RefreshButton>
            </SearchFilter>
            <InfoHeader>
                <InfoHeaderFont>
                    총 <InfoHeaderFont panted>{data?.crawlingResults.length}</InfoHeaderFont>건
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
            <ResultTable crawlingData={data} />
            <PagingContainer>
                <Pagination active={page} setActive={setPage} />
            </PagingContainer>
        </>
    );
};

export default CrawlingResultPage;
