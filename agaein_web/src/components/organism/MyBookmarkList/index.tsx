import { BookmarkList, BookmarkItem } from 'components/pages/myPage/MyPage.style';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';

const MyBookmarkList = () => {
    return (
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
    );
};

export default MyBookmarkList;
