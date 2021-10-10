import Font from 'components/molecules/Font';
import { Comment } from 'graphql/generated/generated';
import { CommentItemContainer, CommentItemWriterContainer } from './CommentItem.style';

interface CommentItemProps {
    comment: Comment;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment } = props;
    return (
        <CommentItemContainer>
            <CommentItemWriterContainer>
                <Font label="익명" fontType="body" fontWeight="bold" htmlElement="span" style={{ marginRight: 10 }} />
                <Font label="21.09.25 22:19:15" fontType="body" htmlElement="span" />
            </CommentItemWriterContainer>
            <Font label="꼭 찾으셨으면 좋겠네요... ㅠ" fontType="subhead" />
        </CommentItemContainer>
    );
};

export default CommentItem;
