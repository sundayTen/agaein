import { ModalContext } from 'contexts/modalContext';
import { UserContext } from './userContext';
import {
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
    useGetBookmarksLazyQuery,
} from 'graphql/generated/generated';
import { useState, useContext, useEffect, useCallback, createContext } from 'react';

interface BookmarkContextProps {
    isBookmarked: (articleId: string) => boolean;
    setBookmark: (articleId: string) => void;
}

export const BookmarkContext = createContext<BookmarkContextProps>({
    isBookmarked: () => false,
    setBookmark: () => {},
});

type BookmarkProviderProps = {
    children: JSX.Element | JSX.Element[] | undefined;
};

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [create] = useCreateBookmarkMutation();
    const [drop] = useDeleteBookmarkMutation();
    const [fetch, { loading }] = useGetBookmarksLazyQuery({
        onCompleted: (data) => {
            const bookmarkData = data?.bookmarks.map((bookmark) => (bookmark ? bookmark.articleId : ''));
            setBookmarks(bookmarkData || []);
        },
    });
    const { isLoggedIn } = useContext(UserContext);
    const { setLoading } = useContext(ModalContext);

    const fetchData = useCallback(async () => {
        await fetch();
        setLoading(loading);
    }, [isLoggedIn]);

    const initialize = useCallback(() => {
        if (isLoggedIn) {
            fetchData();
            return;
        }
    }, [fetchData]);

    useEffect(initialize, [initialize]);

    const getTargetBookmarks = (article_id: string) => {
        if (isBookmarked(article_id)) {
            return bookmarks.filter((bookmark) => bookmark !== article_id);
        }
        return [article_id, ...bookmarks];
    };

    const setLocalStorage = (article_id: string) => {
        localStorage.setItem('bookmark', [article_id, ...bookmarks].join(','));
    };

    const setBookmark = (article_id: string) => {
        const target = getTargetBookmarks(article_id);
        setBookmarks(target);
        if (isLoggedIn) {
            updateBookmarkAtServer(article_id);
        }
        setLocalStorage(article_id);
    };

    const updateBookmarkAtServer = (articleId: string) => {
        if (isBookmarked(articleId)) {
            drop({
                variables: {
                    id: articleId,
                },
            });
            return;
        }
        create({
            variables: {
                articleId,
            },
        });
    };

    const isBookmarked = (article_id: string) => {
        return !!bookmarks.find((bookmark) => bookmark === article_id);
    };

    return <BookmarkContext.Provider value={{ isBookmarked, setBookmark }}>{children}</BookmarkContext.Provider>;
};
