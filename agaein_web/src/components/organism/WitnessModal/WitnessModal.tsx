import Modal from 'components/molecules/Modal';
import { Location, Maybe, ReportInput, useCreateReportMutation, useGetReportsQuery } from 'graphql/generated/generated';
import { useEffect, useState } from 'react';
import ReactKaKaoMap from '../ReactKakaoMap/ReactKakaoMap';
import WitnessImageCarousel from './WitnessImageCarousel';
import WitnessList from './WitnessList/WitnessList';
import { ToggleButon, ToggleButtonDiv } from './WitnessModel.style';
import WitnessReport from './WitnessReport/WitnessReport';

interface WitnessArray {
    id: string;
    name: string;
    address: string;
    date: string;
    hp?: string;
    img?: Maybe<string>[];
    content?: string;
}

interface WitnessModalProps {
    open: boolean;
    close: () => void;
    isAuthor: boolean;
    articleId: string;
    missPosition: {
        lat: number;
        lng: number;
        roadAddress: string;
        address: string;
    };
}

const WitnessModal = ({ open, close, isAuthor = false, articleId, missPosition }: WitnessModalProps) => {
    const [create] = useCreateReportMutation();
    const [witnessToggle, setWitnessToggle] = useState<'지도' | '사진'>('지도');
    const [address, setAddress] = useState<Location>({
        lat: 0,
        lng: 0,
        address: '',
        roadAddress: '',
    } as Location);
    const [files, setFiles] = useState<Array<File>>();
    const [report, setReport] = useState<ReportInput>({
        articleId: articleId,
        phoneNumber: '',
        content: '',
        location: {
            lat: -1,
            lng: -1,
            address: '',
            roadAddress: '',
            detail: '',
        },
        foundDate: '',
    });
    const [listClickIdx, setListClickIdx] = useState<number>(-1);
    const [foundPositionList, setFoundPositionList] = useState<Array<Location>>([]);
    const [witnessList, setWitnessList] = useState<Array<WitnessArray>>([]);

    const reportData = useGetReportsQuery({
        variables: {
            articleId: articleId,
        },
    });
    useEffect(() => {
        const foundPosition: Array<Location> = [];
        const witness: Array<WitnessArray> = [];
        reportData.data?.reports.map((item) => {
            let position: Location;
            if (item !== null) {
                position = item.location;
                witness.push({
                    id: item.id,
                    name: item.author.nickname ?? '',
                    address: item.location.address,
                    date: item.foundDate,
                    hp: item.phoneNumber ?? '',
                    img: item.images,
                    content: String(item.content),
                });

                return foundPosition.push(position);
            }
            return null;
        });
        setFoundPositionList(foundPosition);
        setWitnessList(witness);
    }, [reportData.data]);

    const reportSave = async () => {
        const response = await create({
            variables: {
                files: files,
                report: report,
            },
        });

        if (!!response.errors) {
            //console.log(response.errors[0].message);
            return;
        }

        //console.log('response', response);
    };
    const reportChange = (value: any, name: string) => {
        setReport({ ...report, [name]: value });
    };

    const filesChange = (value: Array<File>) => {
        setFiles(value);
    };

    useEffect(() => {
        if (listClickIdx === -1) {
            setWitnessToggle('지도');
        }
    }, [listClickIdx]);

    if (reportData.loading) return <p>reportData Loading...</p>;
    if (reportData.error) return <p>reportData Error occur</p>;
    return (
        <Modal
            open={open}
            close={close}
            title="발견 리스트"
            btnName={isAuthor ? undefined : '등록'}
            onBtn={isAuthor ? undefined : reportSave}
        >
            <div>
                {isAuthor && (
                    <ToggleButtonDiv>
                        <ToggleButon click={witnessToggle === '지도'} onClick={() => setWitnessToggle('지도')}>
                            지도보기
                        </ToggleButon>
                        <ToggleButon
                            click={witnessToggle === '사진'}
                            onClick={() => setWitnessToggle('사진')}
                            disabled={listClickIdx === -1 ? true : !witnessList[listClickIdx].img}
                        >
                            사진보기
                        </ToggleButon>
                    </ToggleButtonDiv>
                )}
                {witnessToggle === '지도' ? (
                    <ReactKaKaoMap
                        foundPosition={foundPositionList}
                        missPosition={missPosition}
                        setAddress={setAddress}
                        size={{ width: 580, height: 400 }}
                        isCategory={true}
                        noClick={isAuthor ? true : undefined}
                        listClickIdx={listClickIdx}
                    />
                ) : (
                    <WitnessImageCarousel images={listClickIdx !== -1 ? witnessList[listClickIdx].img : undefined} />
                )}
                {isAuthor ? (
                    <WitnessList witness={witnessList} clickIdx={listClickIdx} setClickIdx={setListClickIdx} />
                ) : (
                    <WitnessReport address={address} reportChange={reportChange} filesChange={filesChange} />
                )}
            </div>
        </Modal>
    );
};

export default WitnessModal;
