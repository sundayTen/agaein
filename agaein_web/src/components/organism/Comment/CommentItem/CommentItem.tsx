import Font from 'components/molecules/Font';
import { Comment } from 'graphql/generated/generated';
import useHover from 'hooks/useHover';
import { useRef } from 'react';
import { convertDate } from 'utils/date';
import {
    AuthorTag,
    CommentItemContainer,
    CommentItemToolBox,
    CommentItemWriterContainer,
    DotIcon,
    DotIconButton,
} from './CommentItem.style';

interface CommentItemProps {
    comment?: Comment;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment } = props;
    const commentItemRef = useRef(null);
    const isHover = useHover(commentItemRef);
    const showMenuTooltip = () => {
        console.log('ToolTip Opened');
    };

    return (
        <>
            <CommentItemContainer isChildren={false} ref={commentItemRef}>
                <CommentItemToolBox>
                    <CommentItemWriterContainer>
                        {false && <AuthorTag>작성자</AuthorTag>}
                        <Font
                            label="익명"
                            fontType="body"
                            fontWeight="bold"
                            htmlElement="span"
                            style={{ marginRight: 10, marginLeft: 10 }}
                        />
                        <Font label={convertDate('2021-10-10T09:19:07.915Z')} fontType="body" htmlElement="span" />
                    </CommentItemWriterContainer>
                    {isHover && (
                        <DotIconButton onClick={showMenuTooltip}>
                            <DotIcon />
                        </DotIconButton>
                    )}
                </CommentItemToolBox>
                <Font label="꼭 찾으셨으면 좋겠네요... ㅠ" fontType="subhead" />
            </CommentItemContainer>
        </>
    );
};

export default CommentItem;
