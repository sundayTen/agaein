import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import Textarea from 'components/molecules/Textarea';
import { Comment as CommentType } from 'graphql/generated/generated';
import { useState } from 'react';
import { CommentHeader, CommentContainer, CommentInputContainer } from './Comment.style';
import CommentItem from './CommentItem';

interface CommentProps {
    comments?: CommentType[];
    onPressSubmit?: () => void;
}

const Comment = (props: CommentProps) => {
    const { comments = [], onPressSubmit = () => {} } = props;
    const [commentInput, setCommentInput] = useState<string | undefined>(undefined);

    return (
        <>
            <CommentHeader>
                <Font label={`댓글 ${comments?.length}`} fontType="h4" fontWeight="bold" />
            </CommentHeader>
            <CommentContainer>
                {comments?.map((comment) => (
                    <CommentItem comment={comment} />
                ))}
                <CommentInputContainer>
                    <Textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="발견 정보 또는 응원의 메세지를 남겨주세요 :)"
                    />
                    <Button
                        label="등록"
                        buttonStyle="PAINTED"
                        disabled={!commentInput}
                        onClick={onPressSubmit}
                        style={{ float: 'right', marginTop: 10 }}
                    />
                </CommentInputContainer>
            </CommentContainer>
        </>
    );
};

export default Comment;
