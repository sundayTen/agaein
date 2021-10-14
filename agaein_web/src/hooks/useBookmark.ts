import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const useBookmark = () => {
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const cookies = new Cookies();

    useEffect(() => {
        setBookmarks(cookies.get('bookmark') || []);
    }, []);

    const getTargetBookmarks = (article_id: number) => {
        const isExist = !!bookmarks.find((bookmark) => bookmark === article_id);
        if (isExist) {
            return bookmarks.filter((bookmark) => bookmark !== article_id);
        }
        return [article_id, ...bookmarks];
    };

    const setBookmark = (article_id: number) => {
        const target = getTargetBookmarks(article_id);
        cookies.set('bookmark', target);
        setBookmarks(target);
    };

    const isBookmarked = (article_id: number) => {
        return !!bookmarks.find((bookmark) => bookmark === article_id);
    };

    return { setBookmark, isBookmarked };
};
export default useBookmark;
