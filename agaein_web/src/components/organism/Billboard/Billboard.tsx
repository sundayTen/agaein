import { CrawlingSummary, useGetSummaryQuery } from 'graphql/generated/generated';
import React from 'react';
import { BillboardContainer } from './Billboard.style';
import BillboardSection from './BillboardSection/BillboardSection';

interface BillboardProps {}

const initialData: CrawlingSummary = {
    __typename: 'CrawlingSummary',
    animalTodayCount: 0,
    animalTotalCount: 0,
    searchTodayCount: 0,
    searchTotalCount: 0,
};

const Billboard = (_: BillboardProps) => {
    const { data, loading, error } = useGetSummaryQuery();

    if (!data || loading || error) return <></>;

    return (
        <BillboardContainer>
            <BillboardSection
                today={data.crawlingDashboard?.animalTodayCount as number}
                total={data.crawlingDashboard?.animalTotalCount as number}
                type="animal"
            />
            <BillboardSection
                today={data.crawlingDashboard?.searchTodayCount as number}
                total={data.crawlingDashboard?.searchTotalCount as number}
                type="search"
            />
        </BillboardContainer>
    );
};

export default Billboard;
