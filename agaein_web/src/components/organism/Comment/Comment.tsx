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
        [commentInteractionType, targetCommentId],
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
            case '??????':
                setCommentInteractionType('create');
                setTargetCommentId(commentId);
                setEditCommentInput(undefined);
                break;
            case '??????':
                setTargetCommentId(commentId);
                setEditInfo(commentId);
                break;
            case '??????':
                setCommentInteractionType('delete');
                if (isUnknownComment(commentId)) {
                    show({
                        title: '?????? ??????',
                        content: `??????????????? ????????? ????????? ???????????? ????????????
                        ?????? ????????? ????????? ??????????????? ?????????????????? ?????????.`,
                        children: (
                            <ErrorCheckerInput
                                confirmButtonLabel="????????????"
                                closeModal={close}
                                targetId={commentId}
                                contentType="COMMENT"
                            />
                        ),
                    });
                } else {
                    show({
                        title: '?????? ??????',
                        content: `?????? ?????????????????????????\n ??? ????????? ????????? ??? ????????????`,
                        cancelButtonLabel: '??????',
                        cancelButtonPressed: close,
                        confirmButtonLabel: '??????',
                        confirmButtonPressed: () => dropComment(commentId),
                    });
                }
                break;
            default:
                break;
        }
        // TODO : ?????? setTimeout??? CommentInput ????????? - ????????? ??? ?????? ????????? ?????? ????????? ??????. ?????? ????????? ????????? ???????????????.
        setTimeout(() => {
            focusOnHelper();
        }, 100);
    };

    const isInputComponent = (commentId: string) => {
        return commentInteractionType !== 'delete' && commentId === targetCommentId;
    };
    const hasReply = (comment: CommentType) => {
        return comment.reply && comment.reply !== [];
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
                <Font label={`?????? ${calculateCommentsCount(comments)}`} fontType="h4" fontWeight="bold" />
            </CommentHeader>
            <CommentContainer>
                <RenderComments comments={comments} />
                <CommentInput onPressSubmit={onPressSubmit} />
            </CommentContainer>
        </CommentWrapper>
    );
};

export default Comment;
