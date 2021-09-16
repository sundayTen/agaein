import penguin from 'assets/image/penguin.png';
import { Avatar, Description, ReviewItemContainer, Title } from './ReviewItem.style';

interface ReviewItemProps {
    title?: string;
    description?: string;
}

const ReviewItem = (props: ReviewItemProps) => {
    const { title, description } = props;
    return (
        <ReviewItemContainer>
            <Avatar src={penguin} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </ReviewItemContainer>
    );
};

export default ReviewItem;
