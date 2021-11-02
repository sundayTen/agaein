import { Fragment, useState } from 'react';
import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import Textarea from 'components/molecules/Textarea';
import { Comment as CommentType, useCreateCommentMutation, User } from 'graphql/generated/generated';
import {
    CommentHeader,
    CommentContainer,
    CommentInputContainer,
    CommentPwdContainer,
    CommentPwd,
    CommentToolContainer,
} from './Comment.style';
import CommentItem from './CommentItem';
import { useApolloClient } from '@apollo/client';
import { RequiredGuide, RequiredIcon } from 'components/pages/createArticle/CreateArticle.style';

interface CommentProps {
    comments: CommentType[];
    articleId: string;
    author: User;
}

const Comment = (props: CommentProps) => {
    const { comments = [], articleId, author: articleWriter } = props;
    const client = useApolloClient();
    const [createComment] = useCreateCommentMutation();
    const [commentInput, setCommentInput] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const onPressSubmit = () => {
        if (!commentInput) return;
        setCommentInput(undefined);
        createComment({
            variables: {
                articleId,
                content: commentInput,
            },
            update: () => {
                try {
                    client.cache.modify({
                        id: `Article:${articleId}`,
                        fields: {
                            // TODO : 아래 코드는 새로생긴 코드가 가장 아래에 생기는데, 대댓글일 경우 로직이 다름.
                            comments: (prevComments) => {
                                const newComment = {
                                    __typename: 'Comment',
                                    content: commentInput,
                                };
                                return [...prevComments, newComment];
                            },
                        },
                    });
                } catch (error) {
                    console.error(`Error occur while caching`, error);
                }
            },
        });
    };
    // TODO : 비밀번호 규칙을 정해서 적용해야함.
    const onChangePwd = (pwd: string) => {
        if (true) {
            setPassword(pwd);
        }
    };
    const isAuthorComment = (commentAuthorId: string) => {
        if (articleWriter.kakaoId === 'anonymous') return false;
        return articleWriter.kakaoId === commentAuthorId;
    };
    // ? comments가 null일 수 있는지 모르겠지만 종종 에러가 남.
    if (comments === null) return <></>;
    return (
        <Fragment>
            <CommentHeader>
                <Font label={`댓글 ${comments?.length}`} fontType="h4" fontWeight="bold" />
            </CommentHeader>
            <CommentContainer>
                <CommentInputContainer>
                    <Textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="발견 정보 또는 응원의 메세지를 남겨주세요 :)"
                    />
                    <CommentToolContainer>
                        <CommentPwdContainer>
                            <CommentPwd
                                type="password"
                                value={password}
                                onChange={(e) => onChangePwd(e.target.value)}
                            />
                            <RequiredGuide>
                                <RequiredIcon />
                                비회원의 경우 댓글 등록, 수정, 삭제에 비밀번호가 필요합니다.
                            </RequiredGuide>
                        </CommentPwdContainer>
                        <Button
                            label="등록"
                            buttonStyle="PAINTED"
                            disabled={!commentInput}
                            onClick={onPressSubmit}
                            style={{ float: 'right', marginTop: 10 }}
                        />
                    </CommentToolContainer>
                </CommentInputContainer>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        isAuthors={isAuthorComment(comment.author.kakaoId)}
                    />
                ))}
            </CommentContainer>
        </Fragment>
    );
};

export default Comment;
