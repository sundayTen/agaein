import {
    MyPageSection,
    SectionHeader,
    HeaderItem,
    BookmarkList,
    BookmarkItem,
} from 'components/pages/myPage/MyPage.style';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { useContext } from 'react';
import { BookmarkContext } from 'contexts';
import { Article } from 'graphql/generated/generated';

interface Props {
    bookmarks?: Article[];
}

const MyBookmarkList = (props: Props) => {
    const bookmarks = props.bookmarks;
    const { isBookmarked, setBookmark } = useContext(BookmarkContext);

    return (
        <MyPageSection>
            <SectionHeader>
                <HeaderItem className="active" type="button">
                    나의 북마크
                </HeaderItem>
            </SectionHeader>
            <BookmarkList>
                {bookmarks?.map((bookmark) => {
                    return (
                        <BookmarkItem>
                            <PostItem
                                item={bookmark}
                                bookmarked={isBookmarked(bookmark.id)}
                                setBookmark={() => setBookmark(bookmark.id)}
                            />
                        </BookmarkItem>
                    );
                })}
            </BookmarkList>
        </MyPageSection>
    );
};

export default MyBookmarkList;
