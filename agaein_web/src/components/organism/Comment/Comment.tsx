import Font from 'components/molecules/Font';
import { Comment as CommentType } from 'graphql/generated/generated';
import { CommentContainer, CommentHeader } from './Comment.style';
import CommentItem from './CommentItem';

interface CommentProps {
    comments?: CommentType[];
}

const Comment = (props: CommentProps) => {
    const { comments } = props;

    return (
        <>
            <CommentHeader>
                <Font label={`댓글 ${comments?.length}`} fontType="body" />
            </CommentHeader>
            <CommentContainer>
                {comments?.map((comment) => (
                    <CommentItem comment={comment} />
                ))}
            </CommentContainer>
        </>
    );
};

export default Comment;
