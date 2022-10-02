import { useState } from 'react';
import { MyPageSection, SectionHeader, HeaderItem } from 'components/pages/myPage/MyPage.style';
import { ArticlesTable } from './ArticlesTable';
import { Article, ProfileComment, ProfileReport } from 'graphql/generated/generated';
import { ArticleTab } from './type';

interface Props {
    lfgs?: Article[];
    lfps?: Article[];
    reviews?: Article[];
    comments?: ProfileComment[];
    reports?: ProfileReport[];
}

const MyArticles = (props: Props) => {
    const { lfgs, lfps, reviews, comments, reports } = props;
    const [currentTab, setCurrentTab] = useState<ArticleTab>(ArticleTab.MY);

    const headerItems = [
        {
            type: ArticleTab.MY,
            label: '내가 쓴 게시글',
        },
        {
            type: ArticleTab.COMMENTS,
            label: '내가 쓴 댓글',
        },
        {
            type: ArticleTab.REPORTS,
            label: '내 발견 내역',
        },
        {
            type: ArticleTab.REVIEWS,
            label: '나의 후기',
        },
    ];

    return (
        <MyPageSection>
            <SectionHeader>
                {headerItems.map((item, idx) => {
                    return (
                        <HeaderItem
                            key={idx}
                            type="button"
                            className={item.type === currentTab ? 'active' : ''}
                            onClick={() => setCurrentTab(item.type)}
                        >
                            {item.label}
                        </HeaderItem>
                    );
                })}
            </SectionHeader>
            <ArticlesTable
                currentTab={currentTab}
                lfgs={lfgs}
                lfps={lfps}
                comments={comments}
                reviews={reviews}
                reports={reports}
            />
        </MyPageSection>
    );
};

export default MyArticles;
