import Font from 'components/molecules/Font';
import useHover from 'hooks/useHover';
import { Comment } from 'graphql/generated/generated';
import { Fragment, useEffect, useRef, useState } from 'react';
import { formattedDate } from 'utils/date';
import {
    AuthorTag,
    CommentItemContainer,
    CommentItemToolBox,
    CommentItemWriterContainer,
    CommentSelectContainer,
    DotIcon,
    DotIconButton,
    SelectContainer,
    SelectItem,
} from './CommentItem.style';
import { COMMENT_ADDITIONAL_OPTIONS, COMMENT_OPTION } from '..';

interface CommentItemProps {
    comment: Comment;
    isAuthors: boolean;
    menuHandler: (key: COMMENT_OPTION) => void;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, isAuthors, menuHandler } = props;
    const { content, commentId, author, createdAt } = comment;
    const { nickname } = author;
    const [selectVisible, setSelectVisible] = useState(false);
    const commentItemRef = useRef(null);
    const isHover = useHover(commentItemRef);

    const toggleSelector = () => {
        setSelectVisible(!selectVisible);
    };

    useEffect(() => {
        if (!isHover) setSelectVisible(false);
    }, [isHover]);

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
                        <Font label={formattedDate(createdAt)} fontType="body" htmlElement="span" />
                    </CommentItemWriterContainer>
                    {isHover && (
                        <CommentSelectContainer>
                            <DotIconButton onClick={toggleSelector}>
                                <DotIcon />
                            </DotIconButton>
                            {selectVisible && (
                                <SelectContainer>
                                    {COMMENT_ADDITIONAL_OPTIONS.map((label) => (
                                        <SelectItem key={label} onClick={() => menuHandler(label)}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContainer>
                            )}
                        </CommentSelectContainer>
                    )}
                </CommentItemToolBox>
                <Font label={content} fontType="subhead" />
            </CommentItemContainer>
        </Fragment>
    );
};

export default CommentItem;
