import { Fragment, useCallback, useRef, useState } from 'react';
import { Comment as CommentType, User } from 'graphql/generated/generated';
import { CommentWrapper, CommentHeader, CommentContainer, DeleteModal, ButtonGroup } from './Comment.style';
import { Modal, Font, Button } from 'components/molecules';
import { COMMENT_OPTION } from '.';
import useComment from 'graphql/hooks/useComment';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

interface CommentProps {
    comments: CommentType[];
    articleId: string;
    author: User;
}
type SUBMIT_MODE = 'create' | 'edit';

const Comment = (props: CommentProps) => {
    const { comments = [], articleId, author: articleWriter } = props;
    const helperInputRef = useRef<HTMLTextAreaElement>(null);
    const { createComment, updateComment, deleteComment } = useComment();
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [targetCommentId, setTargetCommentId] = useState<string | undefined>(undefined);
    const [submitButtonMode, setSubmitButtonMode] = useState<SUBMIT_MODE>('create');
    const [password] = useState<string | undefined>(undefined);

    const onPressSubmit = useCallback(
        (content: string, password?: string) => {
            if (submitButtonMode === 'create') {
                createComment({
                    articleId,
                    content,
                    password,
                    commentId: targetCommentId,
                });
            } else {
                if (targetCommentId === undefined) return;
                updateComment({
                    id: targetCommentId,
                    content,
                    password,
                });
            }
            setTargetCommentId(undefined);
        },
        [submitButtonMode, targetCommentId],
    );

    const isAuthorComment = (commentAuthorId: string) => {
        if (articleWriter.kakaoId === 'anonymous') return false;
        return articleWriter.kakaoId === commentAuthorId;
    };

    const focusOnHelper = () => {
        helperInputRef.current?.focus({ preventScroll: false });
    };
    const closeModal = () => {
        setIsModalOpened(false);
    };
    const dropComment = () => {
        if (targetCommentId === undefined) return;
        deleteComment(
            {
                id: targetCommentId,
                password,
            },
            articleId,
        );
        setTargetCommentId(undefined);
        closeModal();
    };

    const handleMenu = (key: COMMENT_OPTION, commentId: string) => {
        setTargetCommentId(commentId);
        switch (key) {
            case '답글':
                setSubmitButtonMode('create');
                break;
            case '수정':
                setSubmitButtonMode('edit');
                break;
            case '삭제':
                setIsModalOpened(true);
                break;
            default:
                break;
        }
        // TODO : 아래 setTimeout은 CommentInput 렌더링 - 포커싱 간 차이 때문에 넣은 눈속임 코드. 좋은 방법이 있다면 수정해야함.
        setTimeout(() => {
            focusOnHelper();
        }, 100);
    };
    return (
        <>
            <CommentWrapper>
                <CommentHeader>
                    <Font label={`댓글 ${comments.length}`} fontType="h4" fontWeight="bold" />
                </CommentHeader>
                <CommentContainer>
                    {comments.map((comment) => (
                        <Fragment key={comment.id}>
                            <CommentItem
                                comment={comment}
                                menuHandler={handleMenu}
                                isAuthors={isAuthorComment(comment.author.kakaoId)}
                            />
                            {comment.id === targetCommentId && (
                                <CommentInput ref={helperInputRef} onPressSubmit={onPressSubmit} />
                            )}
                        </Fragment>
                    ))}
                    <CommentInput onPressSubmit={onPressSubmit} />
                </CommentContainer>
            </CommentWrapper>
            <Modal
                children={
                    <DeleteModal>
                        <Font label={`정말 삭제하시겠습니까?`} fontType="label" htmlElement="p" />
                        <Font label={`이 행동은 되돌릴 수 없습니다.`} fontType="label" htmlElement="p" />
                        <ButtonGroup>
                            <Button label="취소" onClick={closeModal} />
                            <Button label="삭제" buttonStyle="PAINTED" onClick={dropComment} />
                        </ButtonGroup>
                    </DeleteModal>
                }
                open={isModalOpened}
                title="경고"
                close={closeModal}
            />
        </>
    );
};

export default Comment;
