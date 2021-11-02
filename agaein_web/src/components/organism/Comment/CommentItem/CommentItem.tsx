import Font from 'components/molecules/Font';
import useHover from 'hooks/useHover';
import { Comment } from 'graphql/generated/generated';
import { Fragment, useRef } from 'react';
import { convertDate } from 'utils/date';
import {
    AuthorTag,
    CommentItemContainer,
    CommentItemToolBox,
    CommentItemWriterContainer,
    CommentSelectContainer,
    DotIcon,
    DotIconButton,
} from './CommentItem.style';

interface CommentItemProps {
    comment: Comment;
    isAuthors: boolean;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, isAuthors } = props;
    const { content, commentId, author, createdAt } = comment;
    const { nickname } = author;
    const commentItemRef = useRef(null);
    const isHover = useHover(commentItemRef);
    const showMenuTooltip = () => {
        console.log('ToolTip Opened');
    };

    return (
        <Fragment>
            <CommentItemContainer isChildren={!!commentId} ref={commentItemRef}>
                <CommentItemToolBox>
                    <CommentItemWriterContainer>
                        {isAuthors && <AuthorTag>작성자</AuthorTag>}
                        <Font
                            label={nickname ?? '비회원'}
                            fontType="subhead"
                            fontWeight="bold"
                            htmlElement="span"
                            style={{ marginRight: 10 }}
                        />
                        <Font label={convertDate(createdAt)} fontType="body" htmlElement="span" />
                    </CommentItemWriterContainer>
                    {isHover && (
                        <CommentSelectContainer>
                            <DotIconButton onClick={showMenuTooltip}>
                                <DotIcon />
                            </DotIconButton>
                        </CommentSelectContainer>
                    )}
                </CommentItemToolBox>
                <Font label={content} fontType="subhead" />
            </CommentItemContainer>
        </Fragment>
    );
};

export default CommentItem;
