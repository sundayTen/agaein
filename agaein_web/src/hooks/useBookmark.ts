import { useCreateBookmarkMutation, useDeleteBookmarkMutation } from 'graphql/generated/generated';
import { useState } from 'react';

/**
 * TODO : 아래 내용대로 훅 수정
 * 기본적으로 debounce & optimistic UI로 쿼리함
 * 다음의 경우의 수를 모두 커버해야함
 * 1. 회원일 경우 - 서버 데이터를 set
 * 2. 비회원일 경우 - 로컬스토리지 데이터를 set
 * 3. 비회원으로 활동하다 로그인한 경우 - 서버데이터, 로컬스토리지 데이터 비교 후 차이만큼 create / delete mutation
 */
const useBookmark = () => {
    const [create] = useCreateBookmarkMutation();
    const [drop] = useDeleteBookmarkMutation();
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    const getTargetBookmarks = (article_id: string) => {
        const isExist = !!bookmarks.find((bookmark) => bookmark === article_id);
        if (isExist) {
            return bookmarks.filter((bookmark) => bookmark !== article_id);
        }
        return [article_id, ...bookmarks];
    };

    const setBookmark = (article_id: string) => {
        const target = getTargetBookmarks(article_id);
        setBookmarks(target);
        updateBookmarkAtServer(article_id);
    };

    const updateBookmarkAtServer = (articleId: string) => {
        if (isBookmarked(articleId)) {
            drop({
                variables: {
                    id: articleId,
                },
            });
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

    return { setBookmark, isBookmarked };
};
export default useBookmark;
