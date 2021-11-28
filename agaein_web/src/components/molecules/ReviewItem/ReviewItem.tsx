import penguin from 'assets/image/penguin.png';
import { Article, Review } from 'graphql/generated/generated';
import { Fragment } from 'react';
import {
    Description,
    ReviewImageContainer,
    ReviewImage,
    ReviewInfoContainer,
    ReviewItemContainer,
    Title,
} from './ReviewItem.style';

interface ReviewItemProps {
    item: Article;
}

const ReviewItem = (props: ReviewItemProps) => {
    const { item } = props;
    const { articleDetail, images } = item;
    const { title, content } = articleDetail as Review;
    const reviewImage = images.length === 0 ? penguin : (images[0] as string);

    return (
        <Fragment>
            <ReviewItemContainer>
                <ReviewImageContainer>
                    <ReviewImage src={reviewImage} />
                </ReviewImageContainer>
                <ReviewInfoContainer>
                    <Title>{title}</Title>
                    <Description>{content}</Description>
                </ReviewInfoContainer>
            </ReviewItemContainer>
        </Fragment>
    );
};

export default ReviewItem;
