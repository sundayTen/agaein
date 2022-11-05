import { Button, Font } from 'components/molecules';
import { ContentTag } from 'components/molecules/PostItemBox/PostItemBox.style';
import { CrawlingResult } from 'graphql/generated/generated';
import { Fragment, useState } from 'react';
import { BodyTr, HeadTh, HiddenBodyTr, Table, Thead } from './CrawlingResult.style';
import { YYYY_MM_DD, YYYYMMDD } from '../../../utils/date';

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
                <tr>
                    <HeadTh>순위</HeadTh>
                    <HeadTh>품종</HeadTh>
                    <HeadTh>지역</HeadTh>
                    <HeadTh>이름</HeadTh>
                    <HeadTh>성별</HeadTh>
                    <HeadTh>나이</HeadTh>
                    <HeadTh>목격일</HeadTh>
                    <HeadTh>등록일</HeadTh>
                    <HeadTh>사이트</HeadTh>
                    <HeadTh>일치키워드</HeadTh>
                </tr>
            </Thead>
            <tbody>
                {crawlingData?.map((data, idx) => {
                    return (
                        <Fragment key={data?.site}>
                            <BodyTr key={idx} onClick={() => (clickIdx === idx ? setClickIdx(-1) : setClickIdx(idx))}>
                                <td>{isData(data?.rank)}</td>
                                <td>
                                    {isData(data?.type)} / {isData(data?.breed)}
                                </td>
                                <td>{isData(data?.location)}</td>
                                <td>{isData(data?.name)}</td>
                                <td>{isData(data?.gender)}</td>
                                <td>{isData(data?.age)}</td>
                                <td>{YYYY_MM_DD(isData(data?.foundOrLostDate))}</td>
                                <td>{YYYY_MM_DD(isData(data?.createdDate))}</td>
                                <td style={{ width: '120px' }}>
                                    <a href={data?.site}>
                                        <Button label="바로가기" onClick={() => {}} buttonStyle="PAINTED" />
                                    </a>
                                </td>
                                <td>일치키워드</td>
                            </BodyTr>
                            {clickIdx === idx ? (
                                <HiddenBodyTr key={idx}>
                                    <td colSpan={10} align="right">
                                        <div style={{ marginRight: '30px' }}>
                                            {data?.keywords?.map((keyword) => {
                                                return (
                                                    <ContentTag type="CRAWLING">
                                                        <Font
                                                            label={String(keyword)}
                                                            fontType="tag"
                                                            style={{ lineHeight: '14px' }}
                                                        />
                                                    </ContentTag>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </HiddenBodyTr>
                            ) : null}
                        </Fragment>
                    );
                })}
            </tbody>
        </Table>
    );
};
export default ResultTable;
