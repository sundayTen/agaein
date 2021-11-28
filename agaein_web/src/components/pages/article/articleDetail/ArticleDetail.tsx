import { useApolloClient } from '@apollo/client';
import penguin from 'assets/image/penguin.png';
import { BookMark, Button, Chip, Font, ImageCarousel } from 'components/molecules';
import { ContentTag } from 'components/molecules/PostItemBox/PostItemBox.style';
import Comment, { calculateCommentsCount } from 'components/organism/Comment';
import { SelectContainer, SelectItem } from 'components/organism/Comment/CommentItem/CommentItem.style';
import ReactKaKaoMap from 'components/organism/ReactKakaoMap/ReactKakaoMap';
import WitnessModal from 'components/organism/WitnessModal/WitnessModal';
import { UserContext } from 'contexts/userContext';
import { Comment as CommentType, useGetArticleQuery } from 'graphql/generated/generated';
import useArticle from 'graphql/hooks/useArticle';
import useBookmark from 'hooks/useBookmark';
import { Fragment, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';
import { formattedDate, YYYYMMDD } from 'utils/date';
import { isArticle, isLFP, isReports } from 'utils/typeGuards';
import { ARTICLE_MENU_TYPE, AUTHOR_MENU } from '.';
import {
    ArticleDetailContainer,
    ArticleDetailContentContainer,
    ArticleDetailHeader,
    ArticleInfoContainer,
    ArticleMapContainer,
    ArticleSelectContainer,
    ContainerTop,
    HorizontalContainer,
    InfoHeader,
    InfoHeaderFont,
    StyledDotIcon,
    TitleAndBookMarkContainer,
} from './ArticleDetail.style';

const ArticleDetail = ({ match, history }: RouteComponentProps<ArticleDetailParams>) => {
    const { isBookmarked, setBookmark } = useBookmark();
    const { deleteArticle } = useArticle();
    const { isLoggedIn, user } = useContext(UserContext);
    const client = useApolloClient();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
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
    const { breed, feature, age, gender, name, location, foundDate, lostDate, type, keyword } = articleDetail as any;

    const isAuthor = () => {
        return isLoggedIn && user.id === author.id;
    };

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
    const handleMenu = (key: ARTICLE_MENU_TYPE) => {
        switch (key) {
            case '삭제':
                onClickDelete();
                break;
            case '수정':
                /**
                 * TODO : id만 보내는 방법을 모르겠음. 의미없이 boardType을 보내야만 하는가.
                 * QueryString으로 보내는 방법이 있긴 한데 혼용해도 되나?
                 */
                break;
            case '키워드 편집':
                break;
            default:
                break;
        }
    };
    const onClickDelete = () => {
        history.goBack();
        deleteArticle({ id: match.params.id, password: undefined });
    };

    const toggleSelector = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <Fragment>
            <HorizontalContainer>
                <ImageCarousel images={targetImages() as string[]} />
                <ArticleDetailContainer>
                    <ContainerTop>
                        <ArticleDetailHeader>
                            <Chip label="진행중" />
                            {isAuthor() && (
                                <ArticleSelectContainer>
                                    <StyledDotIcon onClick={toggleSelector} />
                                    {menuVisible && (
                                        <SelectContainer>
                                            {AUTHOR_MENU.map((menu) => (
                                                <SelectItem
                                                    onClick={() => handleMenu(menu)}
                                                    style={{ minWidth: 80 }}
                                                    key={menu}
                                                >
                                                    {menu}
                                                </SelectItem>
                                            ))}
                                        </SelectContainer>
                                    )}
                                </ArticleSelectContainer>
                            )}
                        </ArticleDetailHeader>
                        <ArticleDetailContentContainer>
                            <TitleAndBookMarkContainer>
                                <Font label={getTitle()} fontType="h4" fontWeight="bold" htmlElement="span" />
                                <BookMark active={isBookmarked(id)} onClick={() => setBookmark(id)} />
                            </TitleAndBookMarkContainer>
                            <Font label={getDescription()} fontType="body" style={{ marginTop: 6 }} />
                            <Font label={feature} fontType="label" style={{ marginTop: 30, marginBottom: 10 }} />
                            {keyword &&
                                keyword.map((label: string, index: number) => (
                                    <ContentTag key={index.toString()}>
                                        <Font label={label} fontType="tag" />
                                    </ContentTag>
                                ))}
                        </ArticleDetailContentContainer>
                        <ArticleInfoContainer>
                            <Font label={formattedDate(createdAt)} fontType="body" />
                            <Font
                                label={` 북마크 5 · 댓글 ${calculateCommentsCount(
                                    comments as CommentType[],
                                )} · 조회수 ${view}`}
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

            <Comment comments={comments as CommentType[]} articleId={id} author={author} />
            <WitnessModal open={isOpenModal} close={closeModal} missPosition={location} articleId={id} type={'LIST'} />
        </Fragment>
    );
};

export default ArticleDetail;
