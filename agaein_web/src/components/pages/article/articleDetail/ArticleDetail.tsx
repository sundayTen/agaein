import Chip from 'components/molecules/Chip';
import Font from 'components/molecules/Font';
import ImageCarousel from 'components/molecules/ImageCarousel/ImageCarousel';
import {
    Comment as CommentType,
    Location,
    Maybe,
    useGetArticleQuery,
    useGetReportsQuery,
} from 'graphql/generated/generated';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';
import {
    ContainerTop,
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
import { formattedDate, YYYYMMDD } from 'utils/date';
import { Fragment } from 'react';
import { isArticle, isLFP } from 'utils/typeGuards';
import penguin from 'assets/image/penguin.png';

interface WitnessArray {
    id: string;
    name: string;
    address: string;
    date: string;
    hp?: string;
    img?: Maybe<string>[];
}

const ArticleDetail = ({ match }: RouteComponentProps<ArticleDetailParams>) => {
    const { isBookmarked, setBookmark } = useBookmark();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
        },
        onCompleted: (data) => {
            // TODO : 조회수 즉각반영
        },
    });
    const reportData = useGetReportsQuery({
        variables: {
            articleId: match.params.id,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    if (data === undefined || !isArticle(data.article)) return <p>No data</p>;

    if (reportData.loading) return <p>reportData Loading...</p>;
    if (reportData.error) return <p>reportData Error occur</p>;
    const { id, createdAt, articleDetail, view, author, comments = [], images = [] } = data.article;

    // ? TypeGuard로 해결할 방법을 모르겠음
    const { breed, feature, age, gender, name, location, foundDate, lostDate } = articleDetail as any;

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
            });
            return foundPosition.push(position);
        }
        return null;
    });

    function getTitle() {
        if (isLFP(articleDetail)) {
            return `${location.address}에서 강아지(${breed})를 발견했어요`;
        }
        return `${location.address}에서 강아지(${breed})를 찾고있어요`;
    }

    function getDescription() {
        let description = isLFP(articleDetail) ? `실종일 ${YYYYMMDD(lostDate)}` : `발견일 ${YYYYMMDD(foundDate)}`;
        if (!!name) {
            description += ` · 이름 ${name}`;
        }
        if (!!age) {
            description += ` · 나이 ${age}살`;
        }
        if (!!gender) {
            description += ` · 성별 ${gender}`;
        }

        return description;
    }

    const closeModal = () => {
        setIsOpenModal(false);
    };
    const targetImages = () => {
        if (images.length === 0) {
            return [penguin];
        }
        return images;
    };

    return (
        <Fragment>
            <HorizontalContainer>
                <ImageCarousel images={targetImages() as string[]} />
                <ArticleDetailContainer>
                    <ContainerTop>
                        <Chip label="진행중" />

                        <ArticleDetailContentContainer>
                            <TitleAndBookMarkContainer>
                                <Font label={getTitle()} fontType="h4" fontWeight="bold" htmlElement="span" />
                                <BookMark active={isBookmarked(id)} onClick={() => setBookmark(id)} />
                            </TitleAndBookMarkContainer>
                            <Font label={getDescription()} fontType="body" style={{ marginTop: 6 }} />
                            <Font label={feature} fontType="label" />
                        </ArticleDetailContentContainer>
                        <ArticleInfoContainer>
                            <Font label={formattedDate(createdAt)} fontType="body" />
                            <Font label={` 북마크 5 · 댓글 ${comments?.length} · 조회수 ${view}`} fontType="body" />
                        </ArticleInfoContainer>
                    </ContainerTop>
                    <ArticleMapContainer>
                        <Font label="실종장소" fontType="subhead" style={{ marginBottom: 10 }} />
                        <ReactKaKaoMap
                            missPosition={location}
                            size={{ width: 480, height: 260 }}
                            foundPosition={foundPosition}
                            noClick={true}
                        />
                        <Button
                            label="발견 신고 하기"
                            onClick={() => {
                                setIsOpenModal(true);
                            }}
                            buttonStyle="BLACK"
                            style={{ width: '100%', marginTop: 20 }}
                        />
                    </ArticleMapContainer>
                </ArticleDetailContainer>
            </HorizontalContainer>
            <Comment comments={comments as CommentType[]} articleId={id} author={author} />

            <WitnessModal
                open={isOpenModal}
                close={closeModal}
                witness={witness}
                foundPosition={foundPosition}
                missPosition={location}
                isAuthor={true}
                articleId={id}
            />
        </Fragment>
    );
};

export default ArticleDetail;
