import { Comment } from 'graphql/generated/generated';

type COMMENT_OPTION = '답글' | '수정' | '삭제';
const AUTHOR_OPTIONS: COMMENT_OPTION[] = ['답글', '수정', '삭제'];
const USER_OPTIONS: COMMENT_OPTION[] = ['답글'];
type COMMENT_INTERACTION_TYPE = 'create' | 'edit' | 'delete';
const calculateCommentsCount = (comments: Comment[]) =>
    comments.reduce((acc, comment) => acc + comment!.reply.length + 1, 0);

export { AUTHOR_OPTIONS, USER_OPTIONS, calculateCommentsCount };
export type { COMMENT_OPTION, COMMENT_INTERACTION_TYPE };
export { default } from './Comment';
