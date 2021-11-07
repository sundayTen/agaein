import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    ClickIcon,
    Contents,
    Header,
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
    name: string;
    address: string;
    date: string;
    hp?: string;
    img?: string[];
}
interface WitnessListProps {
    witness?: Array<WitnessArray>;
}

const imgDummy = [
    'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    'https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg',
    'https://images.mypetlife.co.kr/content/uploads/2019/09/09153001/dog-panting-1024x683.jpg',
];

const WitnessList = ({
    witness = [
        {
            name: '닉네임482',
            address: '서울 중구 명동2가',
            date: '2021년 10월 23일',
            img: imgDummy,
        },
        {
            name: '닉네임482',
            address: '서울 중구 명동2가',
            date: '2021년 10월 23일',
            hp: '010 - 1234 - 5678',
        },
        {
            name: '닉네임482',
            address: '서울 중구 명동2가',
            date: '2021년 10월 23일',
            hp: '010 - 1234 - 5678',
            img: imgDummy,
        },
    ],
}: WitnessListProps) => {
    const [clickIdx, setClickIdx] = useState(-1);
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
            <tbody>
                {witness.map((item, idx) => {
                    return (
                        <>
                            <Witness key={idx} onClick={(e) => (idx === clickIdx ? setClickIdx(-1) : setClickIdx(idx))}>
                                <td>{idx === clickIdx ? <ClickIcon /> : <UsualIcon />}</td>
                                <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.date}</td>
                                <td>
                                    <Photo isImg={!!item.img} />
                                </td>
                                <td>
                                    <Phone isHp={!!item.hp} />
                                </td>
                                <td>{idx === clickIdx ? <ChevronDown /> : <ChevronUp />}</td>
                            </Witness>
                            <WitnessDetail click={idx === clickIdx}>
                                <td colSpan={7}>
                                    <div style={{ display: 'flex' }}>
                                        <Img />
                                        <Contents>
                                            작성된 발견 정보 글을 확인할 수 있습니다.
                                            <br />
                                            상세한 위치, 특징, 특이 사항 등등..
                                            <br />
                                            <br />
                                            <b>
                                                {item.hp && <span>연락처 : {item.hp} &nbsp;&nbsp;</span>}
                                                {item.img && <SmallPhoto isImg={!!item.img} />}
                                                {item.img?.length}
                                            </b>
                                        </Contents>
                                    </div>
                                </td>
                            </WitnessDetail>
                        </>
                    );
                })}
            </tbody>
        </WitnessListTable>
    );
};

export default WitnessList;
