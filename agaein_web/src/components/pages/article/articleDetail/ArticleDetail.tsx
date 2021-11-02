import Chip from 'components/molecules/Chip';
import Font from 'components/molecules/Font';
import ImageCarousel from 'components/molecules/ImageCarousel/ImageCarousel';
import { Comment as CommentType, useGetArticleQuery } from 'graphql/generated/generated';
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
import Button from 'components/molecules/Button';
import BookMark from 'components/molecules/BookMark';
import useBookmark from 'hooks/useBookmark';
import { useState } from 'react';
import WitnessModal from 'components/organism/WitnessModal/WitnessModal';
import ReactKaKaoMap from 'components/organism/ReactKakaoMap/ReactKakaoMap';
import { convertDate, YYYYMMDD } from 'utils/date';
import { Fragment } from 'react';
import { isArticle, isLFP } from 'utils/typeGuards';

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
    if (data === undefined || !isArticle(data.article)) return <p>No data</p>;
    const { id, createdAt, articleDetail, view, author, comments = [] } = data.article;

    // ? TypeGuard로 해결할 방법을 모르겠음
    const { breed, feature, age = '??', gender, name, location, foundDate, lostDate } = articleDetail as any;

    function getTitle() {
        if (isLFP(articleDetail)) {
            return `${location.address}에서 강아지(${breed})를 발견했어요`;
        }
        return `${location.address}에서 강아지(${breed})를 찾고있어요`;
    }

    function getDescription() {
        if (isLFP(articleDetail)) {
            return `실종일 ${YYYYMMDD(lostDate)} · 이름 ${name} · 나이 ${age}살 · 성별 ${gender}`;
        }
        return `발견일 ${YYYYMMDD(foundDate)} · 이름 ${name} · 나이 ${age}살 · 성별 ${gender}`;
    }

    const closeModal = () => {
        setIsOpenModal(false);
    };
    return (
        <Fragment>
            <HorizontalContainer>
                <ImageCarousel images={imgDummy} />
                <ArticleDetailContainer>
                    <Chip label="진행중" />
                    <Chip label="사례금 200,000원" />
                    <ArticleDetailContentContainer>
                        <TitleAndBookMarkContainer>
                            <Font label={getTitle()} fontType="h4" fontWeight="bold" htmlElement="span" />
                            <BookMark active={isBookmarked(id)} onClick={() => setBookmark(id)} />
                        </TitleAndBookMarkContainer>
                        <Font label={getDescription()} fontType="body" style={{ marginTop: 5, marginBottom: 30 }} />
                        <Font label={feature} fontType="label" />
                    </ArticleDetailContentContainer>
                    <ArticleInfoContainer>
                        <Font label={convertDate(createdAt)} fontType="tag" />
                        <Font label={` 북마크 5 · 댓글 ${comments?.length} · 조회수 ${view}`} fontType="tag" />
                    </ArticleInfoContainer>
                    <ArticleMapContainer>
                        <Font label="실종장소" fontType="subhead" style={{ marginBottom: 10 }} />
                        <ReactKaKaoMap missPosition={location} size={{ width: 480, height: 260 }} />
                        <Button label="발견 신고 하기" onClick={() => {}} style={{ width: '100%', marginTop: 20 }} />
                    </ArticleMapContainer>
                </ArticleDetailContainer>
            </HorizontalContainer>
            <Comment comments={comments as CommentType[]} articleId={id} author={author} />
        </Fragment>
    );
};

export default ArticleDetail;

const imgDummy = [
    'https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg',
    'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    'https://images.mypetlife.co.kr/content/uploads/2019/09/09153001/dog-panting-1024x683.jpg',
];
