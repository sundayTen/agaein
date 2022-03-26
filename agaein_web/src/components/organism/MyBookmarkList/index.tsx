import { BookmarkList, BookmarkItem } from 'components/pages/myPage/MyPage.style';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import { useContext } from 'react';
import { BookmarkContext } from 'contexts';

const MyBookmarkList = () => {
    const { isBookmarked, setBookmark } = useContext(BookmarkContext);

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
