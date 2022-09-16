import { Fragment, useCallback, useContext, useRef, useState } from 'react';
import { Comment as CommentType, User } from 'graphql/generated/generated';
import { CommentWrapper, CommentHeader, CommentContainer, CommentBorder } from './Comment.style';
import { Font, ErrorCheckerInput } from 'components/molecules';
import { calculateCommentsCount, COMMENT_INTERACTION_TYPE, COMMENT_OPTION } from '.';
import useComment from 'graphql/hooks/useComment';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { UserContext, ModalContext } from 'contexts';
import { InputRefProps } from 'components/molecules/Input/Input';

interface CommentProps {
    comments: CommentType[];
    articleId: string;
    author: User;
}

interface renderCommentProps {
    comments: CommentType[];
    isReply?: boolean;
}

const Comment = (props: CommentProps) => {
    const { comments = [], articleId, author: articleWriter } = props;
    const helperInputRef = useRef<HTMLTextAreaElement>(null);
    const { createComment, updateComment, deleteComment } = useComment();
    const { user } = useContext(UserContext);
    const { show, close } = useContext(ModalContext);
    const [targetCommentId, setTargetCommentId] = useState<string | undefined>(undefined);
    const [commentInteractionType, setCommentInteractionType] = useState<COMMENT_INTERACTION_TYPE>('create');
    const [editCommentInput, setEditCommentInput] = useState<string | undefined>(undefined);
    const inputRef = useRef<InputRefProps>(null);
    const onPressSubmit = useCallback(
        (content: string, password?: string) => {
            if (commentInteractionType === 'create') {
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
                setEditCommentInput(undefined);
            }
            setTargetCommentId(undefined);
        },
        [commentInteractionType, targetCommentId, articleId, createComment, updateComment],
    );
    const isAuthorComment = (commentAuthorId: string) => {
        if (articleWriter.kakaoId === 'anonymous') return false;
        return articleWriter.kakaoId === commentAuthorId;
    };

    const focusOnHelper = () => {
        helperInputRef.current?.focus({ preventScroll: false });
    };
    const dropComment = (commentId: string) => {
        if (isAuthorComment(user.kakaoId)) {
        }
        deleteComment(
            {
                id: commentId,
                password: inputRef.current?.getValue(),
            },
            articleId,
        );
        setTargetCommentId(undefined);
        setCommentInteractionType('create');
        close();
    };

    const getTargetContent = (commentId: string) => {
        return comments.find((comment) => comment.id === commentId)?.content;
    };
    const isUnknownComment = (commentId: string) => {
        return comments.find((comment) => comment.id === commentId)?.author.kakaoId === 'anonymous';
    };

    const setEditInfo = (commentId: string) => {
        setCommentInteractionType('edit');
        setEditCommentInput(getTargetContent(commentId));
    };

    const handleMenu = (key: COMMENT_OPTION, commentId: string) => {
        switch (key) {
            case '답글':
                setCommentInteractionType('create');
                setTargetCommentId(commentId);
                setEditCommentInput(undefined);
                break;
            case '수정':
                setTargetCommentId(commentId);
                setEditInfo(commentId);
                break;
            case '삭제':
                setCommentInteractionType('delete');
                if (isUnknownComment(commentId)) {
                    show({
                        title: '댓글 삭제',
                        content: `비회원으로 작성된 댓글을 수정하기 위해서는
                        댓글 등록시 입력한 비밀번호를 입력해주셔야 합니다.`,
                        children: (
                            <ErrorCheckerInput
                                confirmButtonLabel="삭제하기"
                                closeModal={close}
                                targetId={commentId}
                                contentType="COMMENT"
                            />
                        ),
                    });
                } else {
                    show({
                        title: '댓글 삭제',
                        content: `정말 삭제하시겠습니까?\n 이 행동은 되돌릴 수 없습니다`,
                        cancelButtonLabel: '취소',
                        cancelButtonPressed: close,
                        confirmButtonLabel: '삭제',
                        confirmButtonPressed: () => dropComment(commentId),
                    });
                }
                break;
            default:
                break;
        }
        // TODO : 아래 setTimeout은 CommentInput 렌더링 - 포커싱 간 차이 때문에 넣은 눈속임 코드. 좋은 방법이 있다면 수정해야함.
        setTimeout(() => {
            focusOnHelper();
        }, 100);
    };

    const isInputComponent = (commentId: string) => {
        return commentInteractionType !== 'delete' && commentId === targetCommentId;
    };
    const hasReply = (comment: CommentType) => {
        return comment.reply && comment.reply.length > 0;
    };

    const RenderComments = ({ comments }: renderCommentProps) => {
        if (!comments) return <></>;
        return (
            <>
                {comments.map((comment) => {
                    const isReply = hasReply(comment);
                    return (
                        <Fragment key={comment.id}>
                            <>
                                <CommentItem
                                    comment={comment}
                                    menuHandler={handleMenu}
                                    isReply={!isReply}
                                    isAuthors={isAuthorComment(comment.author.kakaoId)}
                                />
                                {isInputComponent(comment.id) && (
                                    <CommentInput
                                        ref={helperInputRef}
                                        content={editCommentInput}
                                        onPressSubmit={onPressSubmit}
                                    />
                                )}
                            </>
                            {<RenderComments comments={comment.reply as CommentType[]} />}
                            {!isReply && <CommentBorder />}
                        </Fragment>
                    );
                })}
            </>
        );
    };

    return (
        <CommentWrapper>
            <CommentHeader>
                <Font label={`댓글 ${calculateCommentsCount(comments)}`} fontType="h4" fontWeight="bold" />
            </CommentHeader>
            <CommentContainer>
                <RenderComments comments={comments} />
                <CommentInput onPressSubmit={onPressSubmit} />
            </CommentContainer>
        </CommentWrapper>
    );
};

export default Comment;
