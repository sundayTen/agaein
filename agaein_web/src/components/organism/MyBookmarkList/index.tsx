import { BookmarkList, BookmarkItem } from 'components/pages/myPage/MyPage.style';
import PostItem from 'components/molecules/PostItemBox/PostItemBox';
import useBookmark from 'hooks/useBookmark';

const MyBookmarkList = () => {
    const { isBookmarked, setBookmark } = useBookmark();

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
