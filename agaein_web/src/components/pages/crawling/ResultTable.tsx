import { Button, Font } from 'components/molecules';
import { ContentTag } from 'components/molecules/PostItemBox/PostItemBox.style';
import { CrawlingResult, CrawlingResultsQuery } from 'graphql/generated/generated';
import { useState } from 'react';
import { BodyTr, HiddenBodyTr, Table, Thead } from './CrawlingResult.style';

interface ResultTableProps {
    crawlingData?: (CrawlingResult | null)[];
}

const ResultTable = ({ crawlingData }: ResultTableProps) => {
    const [clickIdx, setClickIdx] = useState(-1);
    const isData = (data: CrawlingResult[keyof CrawlingResult] | null) => {
        if (data === null || data === undefined) {
            return '-';
        }
        return data;
    };

    return (
        <Table>
            <Thead>
                <th>순위</th>
                <th>품종</th>
                <th>지역</th>
                <th>이름</th>
                <th>성별</th>
                <th>나이</th>
                <th>목격일</th>
                <th>등록일</th>
                <th>사이트</th>
                <th>일치키워드</th>
            </Thead>
            <tbody>
                {crawlingData?.map((data, idx) => {
                    return (
                        <>
                            <BodyTr onClick={() => (clickIdx === idx ? setClickIdx(-1) : setClickIdx(idx))}>
                                <td>{isData(data?.rank)}</td>
                                <td>
                                    {isData(data?.type)} / {isData(data?.breed)}
                                </td>
                                <td>{isData(data?.location)}</td>
                                <td>{isData(data?.name)}</td>
                                <td>{isData(data?.gender)}</td>
                                <td>{isData(data?.age)}</td>
                                <td>{isData(data?.foundDate)}</td>
                                <td>{isData(data?.createdDate)}</td>
                                <td style={{ width: '120px' }}>
                                    <a href={data?.site}>
                                        <Button label="바로가기" onClick={() => {}} buttonStyle="PAINTED" />
                                    </a>
                                </td>
                                <td>일치키워드</td>
                            </BodyTr>
                            {clickIdx === idx ? (
                                <HiddenBodyTr>
                                    <td colSpan={10} align="right">
                                        <div style={{ marginRight: '30px' }}>
                                            <ContentTag type="CRAWLING">
                                                <Font label="강아지" fontType="tag" style={{ lineHeight: '14px' }} />
                                            </ContentTag>
                                            <ContentTag type="CRAWLING">
                                                <Font label="강아지" fontType="tag" style={{ lineHeight: '14px' }} />
                                            </ContentTag>
                                            <ContentTag type="CRAWLING">
                                                <Font label="강아지" fontType="tag" style={{ lineHeight: '14px' }} />
                                            </ContentTag>
                                        </div>
                                    </td>
                                </HiddenBodyTr>
                            ) : null}
                        </>
                    );
                })}
            </tbody>
        </Table>
    );
};
export default ResultTable;
