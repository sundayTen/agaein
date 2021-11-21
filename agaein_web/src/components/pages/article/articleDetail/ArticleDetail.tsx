import { useState, Fragment, useContext } from 'react';
import { Comment as CommentType, useGetArticleQuery } from 'graphql/generated/generated';
import useArticle from 'graphql/hooks/useArticle';
import useBookmark from 'hooks/useBookmark';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';
import { formattedDate, YYYYMMDD } from 'utils/date';
import { isArticle, isComments, isLFP, isReports } from 'utils/typeGuards';
import {
    ArticleDetailContainer,
    ArticleDetailContentContainer,
    ArticleInfoContainer,
    ArticleMapContainer,
    ContainerTop,
    HorizontalContainer,
    TitleAndBookMarkContainer,
    ArticleDetailHeader,
    StyledDotIcon,
    InfoHeader,
    InfoHeaderFont,
} from './ArticleDetail.style';
import { Font, Chip, Button, BookMark, ImageCarousel } from 'components/molecules';
import ReactKaKaoMap from 'components/organism/ReactKakaoMap/ReactKakaoMap';
import Comment from 'components/organism/Comment';
import penguin from 'assets/image/penguin.png';
import WitnessModal from 'components/organism/WitnessModal/WitnessModal';
import { useApolloClient } from '@apollo/client';
import { UserContext } from 'contexts/userContext';

const ArticleDetail = ({ match, history }: RouteComponentProps<ArticleDetailParams>) => {
    const { isBookmarked, setBookmark } = useBookmark();
    const { deleteArticle } = useArticle();
    const { isLoggedIn, user } = useContext(UserContext);
    const client = useApolloClient();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
        },
        onCompleted: (data) => {
            client.cache.modify({
                id: `Article:${data.article?.id}`,
                fields: {
                    view: (prevViewCount) => prevViewCount + 1,
                },
            });
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    if (data === undefined || !isArticle(data.article)) return <p>No data</p>;

    const { id, createdAt, articleDetail, view, author, comments = [], images = [] } = data.article;

    // ? TypeGuard로 해결할 방법을 모르겠음
    const { breed, feature, age, gender, name, location, foundDate, lostDate, type } = articleDetail as any;

    const commentsWithReply = () => {
        if (comments === null || !isComments(comments)) {
            return [];
        }
        return comments
            .map((comment) => {
                if (hasReply(comment)) {
                    return [comment, ...comment.reply];
                }
                return comment;
            })
            .flat();
    };

    const isAuthor = () => {
        return isLoggedIn && user.id === author.id;
    };

    function hasReply(comment: CommentType) {
        return comment.reply.length > 0 && isComments(comment.reply);
    }

    function getTitle() {
        if (isLFP(articleDetail)) {
            return `${location.address}에서 ${type}(${breed})를 발견했어요`;
        }
        return `${location.address}에서 ${type}(${breed})를 찾고있어요`;
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

    const getFoundLocations = () => {
        if (isReports(data.reports)) {
            return data.reports.map((report) => report.location);
        }
        return [];
    };
    const onClickDelete = () => {
        history.goBack();
        deleteArticle({ id: match.params.id, password: undefined });
    };

    return (
        <Fragment>
            <HorizontalContainer>
                <ImageCarousel images={targetImages() as string[]} />
                <ArticleDetailContainer>
                    <ContainerTop>
                        <ArticleDetailHeader>
                            <Chip label="진행중" />
                            <StyledDotIcon onClick={onClickDelete} />
                        </ArticleDetailHeader>
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
                            <Font
                                label={` 북마크 5 · 댓글 ${commentsWithReply().length} · 조회수 ${view}`}
                                fontType="body"
                            />
                        </ArticleInfoContainer>
                    </ContainerTop>
                    <ArticleMapContainer>
                        <InfoHeader>
                            <InfoHeaderFont>실종장소</InfoHeaderFont>
                            <InfoHeaderFont>
                                발견 제보
                                <InfoHeaderFont panted>{` ${getFoundLocations().length}`}</InfoHeaderFont>
                            </InfoHeaderFont>
                        </InfoHeader>
                        <ReactKaKaoMap
                            missPosition={location}
                            foundPosition={getFoundLocations()}
                            size={{ width: 480, height: 260 }}
                            noClick={true}
                        />
                        <Button
                            label={isAuthor() ? '발견 리스트 보기' : '발견 신고 하기'}
                            onClick={() => {
                                setIsOpenModal(true);
                            }}
                            buttonStyle="BLACK"
                            style={{ width: '100%', marginTop: 20 }}
                        />
                    </ArticleMapContainer>
                </ArticleDetailContainer>
            </HorizontalContainer>
            <Comment comments={commentsWithReply() as CommentType[]} articleId={id} author={author} />

            <WitnessModal
                open={isOpenModal}
                close={closeModal}
                missPosition={location}
                isAuthor={isAuthor()}
                articleId={id}
            />
        </Fragment>
    );
};

export default ArticleDetail;
