import { Fragment, useContext, useEffect, useState } from 'react';
import penguin from 'assets/image/penguin.png';
import { BookMark, Button, Chip, Font, ImageCarousel, ErrorCheckerInput } from 'components/molecules';
import { ContentTag } from 'components/molecules/PostItemBox/PostItemBox.style';
import Comment, { calculateCommentsCount } from 'components/organism/Comment';
import { SelectContainer, SelectItem } from 'components/organism/Comment/CommentItem/CommentItem.style';
import ReactKaKaoMap from 'components/organism/ReactKakaoMap/ReactKakaoMap';
import WitnessModal from 'components/organism/WitnessModal/WitnessModal';
import { ModalContext } from 'contexts';
import { UserContext } from 'contexts/userContext';
import { Board_Type, Comment as CommentType, useGetArticleQuery } from 'graphql/generated/generated';
import useArticle from 'graphql/hooks/useArticle';
import { BookmarkContext } from 'contexts';
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
    ListIcon,
    StyledDotIcon,
    TitleAndBookMarkContainer,
    WitnessListButton,
} from './ArticleDetail.style';

const ArticleDetail = ({ match, history }: RouteComponentProps<ArticleDetailParams>) => {
    const { isBookmarked, setBookmark } = useContext(BookmarkContext);
    const { deleteArticle, readArticle } = useArticle();
    const { isLoggedIn, user } = useContext(UserContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const { show, close, setLoading } = useContext(ModalContext);
    const [modalType, setModalType] = useState<'LIST' | 'REPORT'>('REPORT');
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
        },
        onCompleted: (data) => {
            readArticle(data.article?.id);
        },
    });
    useEffect(() => {
        setLoading(loading);
    }, [loading]);
    if (error) return <></>;
    if (data === undefined || !isArticle(data.article)) return <p>No data</p>;

    const { id, createdAt, articleDetail, view, author, comments = [], images = [] } = data.article;

    // ? TypeGuard??? ????????? ????????? ????????????
    const { breed, feature, age, gender, name, location, foundDate, lostDate, type, keyword } = articleDetail as any;

    const isAuthor = () => {
        return isLoggedIn && user.id === author.id;
    };

    function getTitle() {
        if (isLFP(articleDetail)) {
            return `${location.address}?????? ${type}(${breed})??? ???????????????`;
        }
        return `${location.address}?????? ${type}(${breed})??? ???????????????`;
    }

    function getDescription() {
        let description = isLFP(articleDetail) ? `????????? ${YYYYMMDD(lostDate)}` : `????????? ${YYYYMMDD(foundDate)}`;
        if (!!name) {
            description += ` ?? ?????? ${name}`;
        }
        if (!!age) {
            description += ` ?? ?????? ${age}???`;
        }
        if (!!gender) {
            description += ` ?? ?????? ${gender}`;
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
            case '??????':
                if (isAuthor()) {
                    show({
                        title: '????????? ??????',
                        content: `?????? ?????????????????????????\n ??? ????????? ????????? ??? ????????????`,
                        cancelButtonLabel: '??????',
                        cancelButtonPressed: close,
                        confirmButtonLabel: '??????',
                        confirmButtonPressed: deleteUserArticle,
                    });
                } else {
                    show({
                        title: '????????? ??????',
                        content: `??????????????? ????????? ???????????? ???????????? ????????????
                        ????????? ????????? ????????? ??????????????? ?????????????????? ?????????.`,
                        children: (
                            <ErrorCheckerInput
                                confirmButtonLabel="????????????"
                                closeModal={close}
                                targetId={id}
                                contentType="ARTICLE"
                            />
                        ),
                    });
                }
                break;
            case '??????':
                history.push(`/createArticle/step2/${isLFP(articleDetail) ? Board_Type.Lfp : Board_Type.Lfg}/${id}`);
                break;
            default:
                break;
        }
    };
    const deleteUserArticle = () => {
        deleteArticle({ id: match.params.id, password: undefined });
        history.goBack();
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
                            <Chip label="?????????" />
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
                                label={` ?????? ${calculateCommentsCount(comments as CommentType[])} ?? ????????? ${view}`}
                                fontType="body"
                            />
                        </ArticleInfoContainer>
                    </ContainerTop>
                    <ArticleMapContainer>
                        <InfoHeader>
                            <InfoHeaderFont>????????????</InfoHeaderFont>
                            <InfoHeaderFont>
                                ?????? ??????
                                <InfoHeaderFont panted>{` ${getFoundLocations().length}`}</InfoHeaderFont>
                            </InfoHeaderFont>
                        </InfoHeader>
                        <ReactKaKaoMap
                            missPosition={location}
                            foundPosition={getFoundLocations()}
                            size={{ width: 480, height: 260 }}
                            noClick
                        />
                        <div>
                            <Button
                                label="?????? ?????? ??????"
                                onClick={() => {
                                    setIsOpenModal(true);
                                    setModalType('REPORT');
                                }}
                                buttonStyle="BLACK"
                                style={{ width: '85%', marginTop: 20 }}
                            />
                            <WitnessListButton
                                onClick={() => {
                                    setIsOpenModal(true);
                                    setModalType('LIST');
                                }}
                            >
                                <ListIcon />
                            </WitnessListButton>
                        </div>
                    </ArticleMapContainer>
                </ArticleDetailContainer>
            </HorizontalContainer>
            <Comment comments={comments as CommentType[]} articleId={id} author={author} />
            <WitnessModal
                open={isOpenModal}
                close={closeModal}
                missPosition={location}
                articleId={id}
                type={modalType}
                setType={setModalType}
            />
        </Fragment>
    );
};

export default ArticleDetail;
