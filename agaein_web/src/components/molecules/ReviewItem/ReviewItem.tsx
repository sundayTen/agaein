import penguin from 'assets/image/penguin.png';
import {
    Avatar,
    CommentCount,
    Description,
    ReviewerContainer,
    ReviewerName,
    ReviewItemContainer,
    Title,
} from './ReviewItem.style';

interface ReviewItemProps {
    title?: string;
    description?: string;
}

const ReviewItem = (props: ReviewItemProps) => {
    const { title, description } = props;

    return (
        <>
            <ReviewItemContainer>
                <Avatar src={penguin} />
                <Title>{title}</Title>
                <Description>{description}</Description>
            </ReviewItemContainer>
            <ReviewerContainer>
                <ReviewerName>이름</ReviewerName>
                <CommentCount>댓글 30개</CommentCount>
            </ReviewerContainer>
        </>
    );
};

export default ReviewItem;
