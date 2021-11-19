import { useCallback, useContext, useRef, useState } from 'react';
import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import Textarea from 'components/molecules/Textarea';
import { Comment as CommentType, User } from 'graphql/generated/generated';
import {
    CommentWrapper,
    CommentHeader,
    CommentContainer,
    CommentInputContainer,
    CommentPwdContainer,
    CommentPwd,
    CommentToolContainer,
} from './Comment.style';
import CommentItem from './CommentItem';
import { RequiredGuide, RequiredIcon } from 'components/pages/createArticle/CreateArticle.style';
import { UserContext } from 'contexts/userContext';
import useComment from 'graphql/hooks/useComment';
import { COMMENT_OPTION } from '.';

interface CommentProps {
    comments: CommentType[];
    articleId: string;
    author: User;
}

const Comment = (props: CommentProps) => {
    const { comments = [], articleId, author: articleWriter } = props;
    const { isLoggedIn } = useContext(UserContext);
    const { createComment, deleteComment } = useComment();
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const [commentInput, setCommentInput] = useState<string | undefined>(undefined);
    const [replyId, setReplyId] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const onPressSubmit = () => {
        if (!commentInput) return;
        createComment({
            articleId,
            content: commentInput,
            password,
            commentId: replyId,
        });
        resetCommentInput();
        // TODO : 작성된 코멘트로 이동 -> 이미 10개 이상이면 더보기 해제 후 이동.
    };

    // TODO : 비밀번호 규칙을 정해서 적용해야함.
    const onChangePwd = (pwd: string) => {
        if (pwd.length <= 4) {
            setPassword(pwd);
        }
    };
    const resetCommentInput = () => {
        setCommentInput(undefined);
        setPassword(undefined);
        setReplyId(undefined);
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

    const handleMenu = (key: COMMENT_OPTION, commentId: string) => {
        switch (key) {
            case '답글':
                focusOnInput();
                setReplyId(commentId);
                break;
            case '수정':
                // TODO : updateMutation 추가
                break;
            case '삭제':
                // TODO : 팝업 + 실제 데이터로 테스트
                deleteComment(
                    {
                        id: commentId,
                        password,
                    },
                    articleId,
                );
                break;
            default:
                break;
        }
    };

    // ? comments가 null일 수 있는지 모르겠지만 종종 에러가 남.
    if (comments === null) return <></>;
    return (
        <CommentWrapper>
            <CommentHeader>
                <Font label={`댓글 ${comments.length}`} fontType="h4" fontWeight="bold" />
            </CommentHeader>
            <CommentContainer>
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
                            onClick={onPressSubmit}
                            style={{ float: 'right', marginTop: 10 }}
                        />
                    </CommentToolContainer>
                </CommentInputContainer>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        menuHandler={handleMenu}
                        isAuthors={isAuthorComment(comment.author.kakaoId)}
                    />
                ))}
            </CommentContainer>
        </CommentWrapper>
    );
};

export default Comment;
