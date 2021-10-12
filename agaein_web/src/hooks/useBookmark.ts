import Cookies from 'universal-cookie';

export const useBookmark = () => {
    const cookies = new Cookies();

    const getTargetBookmarks = (article_id: number) => {
        let bookmarks = getBookmarks();
        const isExist = !!bookmarks.find((bookmark) => bookmark === article_id);
        if (isExist) {
            return bookmarks.filter((bookmark) => bookmark !== article_id);
        }
        return [article_id, ...bookmarks];
    };

    const getBookmarks = (): number[] => {
        return cookies.get('bookmark') || [];
    };

    const setBookmark = (article_id: number) => {
        cookies.set('bookmark', getTargetBookmarks(article_id));
    };

    const isBookmarked = (article_id: number) => {
        return !!getBookmarks().find((bookmark) => bookmark === article_id);
    };

    return { setBookmark, isBookmarked };
};
