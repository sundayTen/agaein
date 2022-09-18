import {
    MyPageSection,
    SectionHeader,
    HeaderItem,
    SectionBox,
    BookmarkList,
    BookmarkItem,
} from 'components/pages/myPage/MyPage.style';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { useContext } from 'react';
import { BookmarkContext } from 'contexts';

const MyBookmarkList = () => {
    return (
        <MyPageSection>
            <SectionHeader>
                <HeaderItem className="active" type="button">
                    나의 북마크
                </HeaderItem>
            </SectionHeader>
            <SectionBox>
                <BookmarkList>
                    <BookmarkItem>
                        {/* 
                            <PostItem
                                item={article}
                                bookmarked={isBookmarked(article.id)}
                                setBookmark={() => setBookmark(article.id)}
                            />
                        */}
                    </BookmarkItem>
                </BookmarkList>
            </SectionBox>
        </MyPageSection>
    );
};

export default MyBookmarkList;
