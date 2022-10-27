import { useState } from 'react';
import {
    SectionBox,
    MyArticleButtons,
    MyArticleTableArea,
    MyArticleButton,
    StatusIcon,
    ReviewLink,
} from 'components/pages/myPage/MyPage.style';
import { ArticleTab, ArticleSubTab } from './type';
import {
    Article,
    ArticleDetailInput,
    ProfileComment,
    ProfileReport,
    Lfp,
    Lfg,
    Review,
    ArticleDetail,
    Finding_Status,
} from 'graphql/generated/generated';
import { formattedDate } from 'utils/date';

interface Props {
    currentTab: ArticleTab;
    lfgs?: Article[];
    lfps?: Article[];
    reviews?: Article[];
    comments?: ProfileComment[];
    reports?: ProfileReport[];
}

export function ArticlesTable(props: Props) {
    const { currentTab, lfgs, lfps, reviews, comments, reports } = props;
    const [currentSubTab, SetCurrentSubTab] = useState<ArticleSubTab>(ArticleSubTab.LFP);

    const getTableHeadLabels = () => {
        let headlabels;
        switch (currentTab) {
            case ArticleTab.MY:
                headlabels = ['상태', '제목', '후기', '조회수'];
                break;
            case ArticleTab.COMMENTS:
                headlabels = ['내용', '작성일'];
                break;
            case ArticleTab.REPORTS:
                headlabels = ['상태', '제목', '발견 지역', '발견일'];
                break;
            case ArticleTab.REVIEWS:
                headlabels = ['제목', '조회수', '작성일'];
                break;
        }
        return headlabels;
    };

    const unConvertStatus = (status: string) => {
        if (status === '진행중') {
            return Finding_Status.Finding;
        }

        return Finding_Status.Done;
    };

    return (
        <SectionBox>
            {(currentTab === ArticleTab.MY || currentTab === ArticleTab.REPORTS) && (
                <MyArticleButtons>
                    <MyArticleButton
                        type="button"
                        active={currentSubTab === ArticleSubTab.LFP}
                        onClick={() => SetCurrentSubTab(ArticleSubTab.LFP)}
                    >
                        찾고 있어요
                    </MyArticleButton>
                    <MyArticleButton
                        type="button"
                        active={currentSubTab === ArticleSubTab.LFG}
                        onClick={() => SetCurrentSubTab(ArticleSubTab.LFG)}
                    >
                        <>발견 했어요</>
                    </MyArticleButton>
                </MyArticleButtons>
            )}
            <MyArticleTableArea>
                <table>
                    <thead>
                        <tr>
                            {getTableHeadLabels().map((label) => {
                                return <th>{label}</th>;
                            })}
                        </tr>
                    </thead>
                    {currentTab === ArticleTab.MY && (
                        <>
                            {currentSubTab === ArticleSubTab.LFP && (
                                <tbody>
                                    {lfps?.map((lfp, index) => {
                                        const { type, status, location, breed } = lfp.articleDetail as Lfp;
                                        const { comments, id } = lfp;
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <StatusIcon status={unConvertStatus(status)}>{status}</StatusIcon>
                                                </td>
                                                <td>
                                                    <a href={'/articleDetail/' + id}>
                                                        {location.address}에서 {type}({breed})를 찾고있어요{' '}
                                                        {comments && comments.length > 0 && (
                                                            <span className="count">({comments.length})</span>
                                                        )}
                                                    </a>
                                                </td>
                                                <td>
                                                    {unConvertStatus(status) === Finding_Status.Done && (
                                                        <ReviewLink href={'/createReview' + id}>후기 작성</ReviewLink>
                                                    )}
                                                </td>
                                                <td>{lfp.view}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )}
                            {currentSubTab === ArticleSubTab.LFG && (
                                <tbody>
                                    {lfgs?.map((lfg, index) => {
                                        const { type, status, location, breed } = lfg.articleDetail as Lfg;
                                        const { comments, id } = lfg;
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <StatusIcon status={unConvertStatus(status)}>{status}</StatusIcon>
                                                </td>
                                                <td>
                                                    <a href={'/articleDetail/' + id}>
                                                        {location.address}에서 {type}({breed})를 찾고있어요{' '}
                                                        {comments && comments.length > 0 && (
                                                            <span className="count">({comments.length})</span>
                                                        )}
                                                    </a>
                                                </td>
                                                <td>
                                                    {unConvertStatus(status) === Finding_Status.Done && (
                                                        <ReviewLink href={'/createReview/' + id}>후기 작성</ReviewLink>
                                                    )}
                                                </td>
                                                <td>{lfg.view}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )}
                        </>
                    )}
                    {currentTab === ArticleTab.COMMENTS && (
                        <tbody>
                            {comments?.map((comment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{comment.content}</td>
                                        <td>{formattedDate(comment.createdAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                    {currentTab === ArticleTab.REPORTS && (
                        <tbody>
                            {reports?.map((report, index) => {
                                const { articleDetail, articleId } = report as ProfileReport;
                                const { __typename } = articleDetail as ArticleDetail;
                                const { location, status, breed, name } =
                                    __typename === 'LFG' ? (articleDetail as Lfg) : (articleDetail as Lfp);
                                const { foundDate } = articleDetail as Lfg;
                                const { lostDate } = articleDetail as Lfp;

                                if (__typename === currentSubTab) {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <StatusIcon status={unConvertStatus(status)}>{status}</StatusIcon>
                                            </td>
                                            <td>
                                                <a href={'/articleDetail/' + articleId}>
                                                    {location.address}에서 {name}({breed})를 찾고있어요{' '}
                                                    <span className="count">(3)</span>
                                                </a>
                                            </td>
                                            <td>{report.location.address}</td>
                                            {currentSubTab === ArticleSubTab.LFG ? (
                                                <td>{formattedDate(foundDate)}</td>
                                            ) : (
                                                <td>{formattedDate(lostDate)}</td>
                                            )}
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    )}
                    {currentTab === ArticleTab.REVIEWS && (
                        <tbody>
                            {reviews?.map((review) => {
                                const { title } = review.articleDetail as Review;
                                return (
                                    <tr>
                                        <td>{title}</td>
                                        <td>{review.view}</td>
                                        <td>{formattedDate(review.createdAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </MyArticleTableArea>
        </SectionBox>
    );
}
