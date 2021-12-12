import Font from 'components/molecules/Font';
import useHover from 'hooks/useHover';
import { Comment } from 'graphql/generated/generated';
import { useContext, useEffect, useRef, useState } from 'react';
import { formattedDate } from 'utils/date';
import {
    AuthorTag,
    CommentItemContainer,
    CommentItemToolBox,
    CommentItemWriterContainer,
    CommentSelectContainer,
    DotIcon,
    DotIconButton,
    ReplyIcon,
    SelectContainer,
    SelectItem,
} from './CommentItem.style';
import { AUTHOR_OPTIONS, USER_OPTIONS, COMMENT_OPTION } from '..';
import { UserContext } from 'contexts/userContext';

interface CommentItemProps {
    comment: Comment;
    isAuthors: boolean;
    isReply?: boolean;
    menuHandler: (key: COMMENT_OPTION, commentId: string) => void;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, isAuthors, isReply = false, menuHandler } = props;
    const { user } = useContext(UserContext);
    const { id, content, author, createdAt } = comment;
    const { kakaoId, nickname } = author;

    const [selectVisible, setSelectVisible] = useState(false);
    const commentItemRef = useRef<HTMLDivElement>(null);
    const isHover = useHover(commentItemRef);

    const toggleSelector = () => {
        setSelectVisible(!selectVisible);
    };
    const isNonMemberComment = () => {
        return kakaoId === 'anonymous';
    };

    const isMyComment = () => {
        return user.kakaoId === kakaoId;
    };

    const getOption = () => {
        if (isMyComment() || isNonMemberComment()) {
            return AUTHOR_OPTIONS;
        }
        return USER_OPTIONS;
    };

    useEffect(() => {
        if (!isHover) setSelectVisible(false);
    }, [isHover]);

    const commentContent = () => {
        if (content === '') {
            return '삭제된 댓글입니다';
        }
        return content;
    };

    return (
        <CommentItemContainer isReply={isReply} ref={commentItemRef}>
            <CommentItemToolBox>
                <CommentItemWriterContainer>
                    {isReply && <ReplyIcon />}
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
                                {getOption().map((label) => {
                                    // TODO : 매우 비효율적. 다른 방법이 필요함.
                                    return (
                                        <SelectItem
                                            key={label}
                                            onClick={() => {
                                                menuHandler(label, id);
                                                setSelectVisible(false);
                                            }}
                                        >
                                            {label}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContainer>
                        )}
                    </CommentSelectContainer>
                )}
            </CommentItemToolBox>
            {/* 삭제된 글은 다른 스타일로 보이도록 수정 */}
            <Font label={commentContent()} fontType="subhead" />
        </CommentItemContainer>
    );
};

export default CommentItem;
