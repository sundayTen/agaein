import Chip from 'components/molecules/Chip';
import Font from 'components/molecules/Font';
import ImageCarousel from 'components/molecules/ImageCarousel/ImageCarousel';
import { Article, Lfg, useGetArticleQuery } from 'graphql/generated/generated';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';
import {
    ArticleDetailContainer,
    ArticleDetailContentContainer,
    ArticleInfoContainer,
    ArticleMapContainer,
    HorizontalContainer,
    TitleAndBookMarkContainer,
} from './ArticleDetail.style';
import Comment from 'components/organism/Comment';
import KakaoMap from 'components/organism/kakaomap/KakaoMap';
import Button from 'components/molecules/Button';
import { convertDate } from 'utils/date';
import BookMark from 'components/molecules/BookMark';
import useBookmark from 'hooks/useBookmark';
import { useState } from 'react';
import WitnessModal from 'components/organism/WitnessModal/WitnessModal';
import ReactKaKaoMap from 'components/organism/ReactKakaoMap/ReactKakaoMap';

const ArticleDetail = ({ match }: RouteComponentProps<ArticleDetailParams>) => {
    const { isBookmarked, setBookmark } = useBookmark();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    const { id, createdAt, articleDetail } = data?.article as Article;
    const { breed, feature, gender, name, location } = articleDetail as Lfg;

    const closeModal = () => {
        setIsOpenModal(false);
    };
    return (
        <>
            <HorizontalContainer>
                <ImageCarousel images={imgDummy} />
                <ArticleDetailContainer>
                    <Chip label="진행중" />
                    <Chip label="사례금 200,000원" />
                    <ArticleDetailContentContainer>
                        <TitleAndBookMarkContainer>
                            <Font
                                label={`서울 송파구에서 강아지(${breed})를 찾고있어요`}
                                fontType="h4"
                                fontWeight="bold"
                                htmlElement="span"
                            />
                            <BookMark active={isBookmarked(id)} onClick={() => setBookmark(id)} />
                        </TitleAndBookMarkContainer>
                        <Font
                            label={`실종일 
                            2021년 10월 13일 · 이름 ${name} · 나이 6.2살 · 성별 ${gender}`}
                            fontType="body"
                            style={{ marginTop: 5, marginBottom: 30 }}
                        />
                        <Font label={feature} fontType="label" />
                    </ArticleDetailContentContainer>
                    <ArticleInfoContainer>
                        <Font label={convertDate(createdAt)} fontType="tag" />
                        <Font label={` 북마크 5 · 댓글 8 · 조회수 162`} fontType="tag" />
                    </ArticleInfoContainer>
                    <ArticleMapContainer>
                        <Font label="실종장소" fontType="subhead" style={{ marginBottom: 10 }} />
                        <ReactKaKaoMap noClick={true} size={{ width: 480, height: 260 }} />
                        <Button
                            label="발견 신고 하기"
                            onClick={() => setIsOpenModal(true)}
                            style={{ width: '100%', marginTop: 20 }}
                        />
                    </ArticleMapContainer>
                </ArticleDetailContainer>
            </HorizontalContainer>
            <Comment comments={[]} />
            <WitnessModal open={isOpenModal} close={closeModal} isAuthor={true} />
        </>
    );
};

export default ArticleDetail;

const imgDummy = [
    'https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg',
    'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    'https://images.mypetlife.co.kr/content/uploads/2019/09/09153001/dog-panting-1024x683.jpg',
];
