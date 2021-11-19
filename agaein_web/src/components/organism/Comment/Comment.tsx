import { useCallback, useContext, useRef, useState } from 'react';
import { Comment as CommentType, User } from 'graphql/generated/generated';
import {
    CommentWrapper,
    CommentHeader,
    CommentContainer,
    CommentInputContainer,
    CommentPwdContainer,
    CommentPwd,
    CommentToolContainer,
    DeleteModal,
    ButtonGroup,
} from './Comment.style';
import CommentItem from './CommentItem';
import { RequiredGuide, RequiredIcon } from 'components/organism/Form/Form.style';
import { Modal, Textarea, Font, Button } from 'components/molecules';
import { UserContext } from 'contexts/userContext';
import useComment from 'graphql/hooks/useComment';
import { COMMENT_OPTION } from '.';

interface CommentProps {
    comments: CommentType[];
    articleId: string;
    author: User;
}
type SUBMIT_MODE = 'create' | 'edit';

const Comment = (props: CommentProps) => {
    const { comments = [], articleId, author: articleWriter } = props;
    const { isLoggedIn } = useContext(UserContext);
    const { createComment, updateComment, deleteComment } = useComment();
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const [commentInput, setCommentInput] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [targetCommentId, setTargetCommentId] = useState<string | undefined>(undefined);
    const [submitButtonMode, setSubmitButtonMode] = useState<SUBMIT_MODE>('create');

    const onPressSubmit = useCallback(() => {
        if (commentInput === '' || commentInput === undefined) return;
        if (submitButtonMode === 'create') {
            createComment({
                articleId,
                content: commentInput,
                password,
                commentId: targetCommentId,
            });
        } else {
            if (targetCommentId === undefined) return;
            updateComment({
                id: targetCommentId,
                content: commentInput,
                password,
            });
        }
        resetCommentInput();
    }, [commentInput, submitButtonMode, targetCommentId, password]);

    // TODO : 비밀번호 규칙을 정해서 적용해야함.
    const onChangePwd = (pwd: string) => {
        if (pwd.length <= 4) {
            setPassword(pwd);
        }
    };
    const resetCommentInput = () => {
        setCommentInput(undefined);
        setPassword(undefined);
        setTargetCommentId(undefined);
        setSubmitButtonMode('create');
    };
    const isAuthorComment = (commentAuthorId: string) => {
        if (articleWriter.kakaoId === 'anonymous') return false;
        return articleWriter.kakaoId === commentAuthorId;
    };
    const submitDisabled = useCallback(() => {
        return !commentInput || (!isLoggedIn && typeof password === 'string' && password.length !== 4);
    }, [commentInput, password, isLoggedIn]);

    const focusOnInput = () => {
        commentInputRef.current?.focus({ preventScroll: false });
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
        closeModal();
    };

    const handleMenu = (key: COMMENT_OPTION, commentId: string) => {
        setTargetCommentId(commentId);
        switch (key) {
            case '답글':
                setSubmitButtonMode('create');
                focusOnInput();
                break;
            case '수정':
                setSubmitButtonMode('edit');
                focusOnInput();
                break;
            case '삭제':
                setIsModalOpened(true);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <CommentWrapper>
                <CommentHeader>
                    <Font label={`댓글 ${comments.length}`} fontType="h4" fontWeight="bold" />
                </CommentHeader>
                <CommentContainer>
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            menuHandler={handleMenu}
                            isAuthors={isAuthorComment(comment.author.kakaoId)}
                        />
                    ))}
                    <CommentInputContainer>
                        <Textarea
                            ref={commentInputRef}
                            value={commentInput ?? ''}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="발견 정보 또는 응원의 메세지를 남겨주세요 :)"
                        />
                        <CommentToolContainer>
                            {isLoggedIn ? (
                                <div />
                            ) : (
                                <CommentPwdContainer>
                                    <CommentPwd
                                        type="password"
                                        value={password ?? ''}
                                        onChange={(e) => onChangePwd(e.target.value)}
                                        placeholder="비밀번호"
                                    />
                                    <RequiredGuide>
                                        <RequiredIcon />
                                        비회원의 경우 댓글 등록, 수정, 삭제에 비밀번호가 필요합니다.
                                    </RequiredGuide>
                                </CommentPwdContainer>
                            )}
                            <Button
                                label="등록"
                                buttonStyle="PAINTED"
                                disabled={submitDisabled()}
                                onClick={() => onPressSubmit()}
                                style={{ float: 'right', marginTop: 10 }}
                            />
                        </CommentToolContainer>
                    </CommentInputContainer>
                </CommentContainer>
            </CommentWrapper>
            <Modal
                children={
                    <DeleteModal>
                        <Font label={`정말 삭제하시겠습니까?`} fontType="label" htmlElement="p" />
                        <Font label={`이 행동은 되둘릴 수 없습니다.`} fontType="label" htmlElement="p" />
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
