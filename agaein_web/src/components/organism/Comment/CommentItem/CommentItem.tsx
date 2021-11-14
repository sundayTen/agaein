import Font from 'components/molecules/Font';
import useHover from 'hooks/useHover';
import { Comment } from 'graphql/generated/generated';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
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
import { UserContext } from 'contexts/userContext';

interface CommentItemProps {
    comment: Comment;
    isAuthors: boolean;
    menuHandler: (key: COMMENT_OPTION, commentId: string) => void;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, isAuthors, menuHandler } = props;
    const { isLoggedIn } = useContext(UserContext);
    const { id, content, commentId, author, createdAt } = comment;
    const { kakaoId, nickname } = author;

    const [selectVisible, setSelectVisible] = useState(false);
    const commentItemRef = useRef<HTMLDivElement>(null);
    const isHover = useHover(commentItemRef);

    const toggleSelector = () => {
        setSelectVisible(!selectVisible);
    };
    const isMemberComment = () => {
        return kakaoId !== 'anonymous';
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
                                    {COMMENT_ADDITIONAL_OPTIONS.map((label) => {
                                        // TODO : 매우 비효율적. 다른 방법이 필요함.
                                        if (isMemberComment() && !isLoggedIn && label !== '답글') return <></>;
                                        return (
                                            <SelectItem key={label} onClick={() => menuHandler(label, id)}>
                                                {label}
                                            </SelectItem>
                                        );
                                    })}
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
