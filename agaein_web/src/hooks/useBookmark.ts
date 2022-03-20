import { ModalContext } from 'contexts/modalContext';
import { UserContext } from './../contexts/userContext';
import {
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
    useGetBookmarksLazyQuery,
} from 'graphql/generated/generated';
import { useState, useContext, useEffect, useCallback } from 'react';

/**
 * TODO : 아래 내용대로 훅 수정
 * 기본적으로 debounce & optimistic UI로 쿼리함
 * 다음의 경우의 수를 모두 커버해야함
 * 1. 회원일 경우 - 서버 데이터를 set
 * 2. 비회원일 경우 - 로컬스토리지 데이터를 set
 * 3. 비회원으로 활동하다 로그인한 경우 - 서버데이터, 로컬스토리지 데이터 비교 후 차이만큼 create / delete mutation
 */
const useBookmark = () => {
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

    // const getTotalBookmarks = () => {
    //     const localBookmarks = localStorage.getItem('bookmark')?.split(',') || [];
    //     return Array.from(new Set([...bookmarks, ...localBookmarks]));
    // };

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
                errorPolicy: 'ignore',
            });
            return;
        }
        create({
            variables: {
                articleId,
            },
            errorPolicy: 'ignore',
        });
    };

    const isBookmarked = (article_id: string) => {
        return !!bookmarks.find((bookmark) => bookmark === article_id);
    };

    return { setBookmark, isBookmarked };
};
export default useBookmark;
