import penguin from 'assets/image/penguin.png';
import {
    Avatar,
    CommentCount,
    Description,
    ReviewerContainer,
    ReviewerName,
    ReviewInfoContainer,
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
                <ReviewInfoContainer>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </ReviewInfoContainer>
            </ReviewItemContainer>
            <ReviewerContainer>
                <ReviewerName>이름</ReviewerName>
                <CommentCount>댓글 30개</CommentCount>
            </ReviewerContainer>
        </>
    );
};

export default ReviewItem;
