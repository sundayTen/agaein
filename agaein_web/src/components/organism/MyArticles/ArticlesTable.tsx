import { useState } from 'react';
import {
    SectionBox,
    MyArticleButtons,
    MyArticleTableArea,
    MyArticleButton,
    StatusIcon,
} from 'components/pages/myPage/MyPage.style';
import { Button } from 'components/molecules';
import { ArticleTab, ArticleSubTab } from './type';
import {
    Article,
    ArticleDetailInput,
    ProfileComment,
    ProfileReport,
    Report,
    Lfp,
    Lfg,
    Review,
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

    const getArticleTitle = (article: Article) => {
        const { location } = article.articleDetail as ArticleDetailInput;
        const { type } = article;
        return { location } + '에서' + { type } + '를 찾고있어요';
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
                                    {lfps?.map((lfp) => {
                                        const { type, status, location } = lfp.articleDetail as Lfp;
                                        const comments = lfp.comments;
                                        return (
                                            <tr>
                                                <td>
                                                    <StatusIcon status="stop">{status}</StatusIcon>
                                                </td>
                                                <td>
                                                    <a href="">
                                                        {location.address}에서 {type}(치와와)를 찾고있어요{' '}
                                                        {comments && comments.length > 0 && (
                                                            <span className="count">({comments.length})</span>
                                                        )}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Button
                                                        label="후기 작성"
                                                        onClick={() => {}}
                                                        buttonStyle="BLACK"
                                                        size="SMALL"
                                                    />
                                                </td>
                                                <td>{lfp.view}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )}
                            {currentSubTab === ArticleSubTab.LFG && (
                                <tbody>
                                    {lfgs?.map((lfg) => {
                                        const { type, status, location } = lfg.articleDetail as Lfg;
                                        const comments = lfg.comments;
                                        return (
                                            <tr>
                                                <td>
                                                    <StatusIcon status="stop">{status}</StatusIcon>
                                                </td>
                                                <td>
                                                    <a href="">
                                                        {location.address}에서 {type}(치와와)를 찾고있어요{' '}
                                                        {comments && comments.length > 0 && (
                                                            <span className="count">({comments.length})</span>
                                                        )}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Button
                                                        label="후기 작성"
                                                        onClick={() => {}}
                                                        buttonStyle="BLACK"
                                                        size="SMALL"
                                                    />
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
                            {comments?.map((comment) => {
                                return (
                                    <tr>
                                        <td>{comment.content}</td>
                                        <td>{formattedDate(comment.createdAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                    {/* TODO: 서버단에서 데이터 변경되면 작업 예정 */}
                    {currentTab === ArticleTab.REPORTS && (
                        <tbody>
                            <tr>
                                <td>
                                    <StatusIcon status="active">진행중</StatusIcon>
                                </td>
                                <td>
                                    <a href="">
                                        서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                    </a>
                                </td>
                                <td></td>
                                <td>162</td>
                            </tr>
                            <tr>
                                <td>
                                    <StatusIcon status="stop">중단</StatusIcon>
                                </td>
                                <td>
                                    <a href="">
                                        서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                    </a>
                                </td>
                                <td>
                                    <Button label="후기 작성" onClick={() => {}} buttonStyle="BLACK" size="SMALL" />
                                </td>
                                <td>162</td>
                            </tr>
                            <tr>
                                <td>
                                    <StatusIcon status="complete">완료</StatusIcon>
                                </td>
                                <td>
                                    <a href="">
                                        서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                    </a>
                                </td>
                                <td>
                                    <Button label="후기 작성" onClick={() => {}} buttonStyle="BLACK" size="SMALL" />
                                </td>
                                <td>162</td>
                            </tr>
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
