import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useBookmark = () => {
    const [storedValue, setValue] = useLocalStorage('bookmark', [1]);
    const [bookmarks, setBookmarks] = useState<number[]>([]);

    useEffect(() => {
        setBookmarks(storedValue || []);
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
        setValue(target);
        setBookmarks(target);
    };

    const isBookmarked = (article_id: number) => {
        return !!bookmarks.find((bookmark) => bookmark === article_id);
    };

    return { setBookmark, isBookmarked };
};
export default useBookmark;
