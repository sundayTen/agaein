import { Maybe } from 'graphql/generated/generated';
import React from 'react';
import { YYYYMMDD } from 'utils/date';
import { WitnessDetailDiv } from '../WitnessModel.style';
import {
    ChevronDown,
    ChevronUp,
    ClickIcon,
    Contents,
    Header,
    Hpspan,
    Img,
    Phone,
    Photo,
    SmallPhoto,
    UsualIcon,
    Witness,
    WitnessDetail,
    WitnessListTable,
} from './WitnessList.style';
interface WitnessArray {
    id: string;
    name: string;
    address: string;
    date: string;
    hp?: string;
    img?: Maybe<string>[];
    content?: string;
}
interface WitnessListProps {
    witness?: Array<WitnessArray>;
    clickIdx: number;
    setClickIdx: (value: number) => void;
}

const WitnessList = ({ witness, clickIdx, setClickIdx }: WitnessListProps) => {
    return (
        <WitnessListTable>
            <thead>
                <Header>
                    <td />
                    <td>이름</td>
                    <td>발견 장소</td>
                    <td>발견 일자</td>
                    <td />
                    <td />
                    <td />
                </Header>
            </thead>
            {witness?.map((item, idx) => {
                return (
                    <tbody key={item.id}>
                        <Witness onClick={() => (idx === clickIdx ? setClickIdx(-1) : setClickIdx(idx))}>
                            <td>{idx === clickIdx ? <ClickIcon /> : <UsualIcon />}</td>
                            <td>
                                <b>{item.name}</b>
                            </td>
                            <td>{item.address}</td>
                            <td>{YYYYMMDD(item.date)}</td>
                            <td>
                                <Photo isimg={!!item.img} />
                            </td>
                            <td>
                                <Phone ishp={!!item.hp} />
                            </td>
                            <td>{idx === clickIdx ? <ChevronUp /> : <ChevronDown />}</td>
                        </Witness>
                        <WitnessDetail click={idx === clickIdx}>
                            <td colSpan={7}>
                                <WitnessDetailDiv>
                                    <Img src={!!item.img ? String(item.img[0]) : ''} width="128" height="100" />
                                    <Contents>
                                        {item.content}
                                        <br />
                                        <br />
                                        <b>
                                            {item.hp && <Hpspan>연락처 : {item.hp}</Hpspan>}
                                            {item.img && <SmallPhoto isimg={!!item.img} />}
                                            {item.img?.length}
                                        </b>
                                    </Contents>
                                </WitnessDetailDiv>
                            </td>
                        </WitnessDetail>
                    </tbody>
                );
            })}
        </WitnessListTable>
    );
};

export default WitnessList;
