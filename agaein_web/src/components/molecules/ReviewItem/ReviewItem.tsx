import penguin from 'assets/image/penguin.png';
import { Article, Review } from 'graphql/generated/generated';
import { Fragment } from 'react';
import { Avatar, Description, ReviewInfoContainer, ReviewItemContainer, Title } from './ReviewItem.style';

interface ReviewItemProps {
    item: Article;
}

const ReviewItem = (props: ReviewItemProps) => {
    const { item } = props;
    const { articleDetail } = item;
    const { title, content } = articleDetail as Review;
    return (
        <Fragment>
            <ReviewItemContainer>
                <Avatar src={penguin} />
                <ReviewInfoContainer>
                    <Title>{title}</Title>
                    <Description>{content}</Description>
                </ReviewInfoContainer>
            </ReviewItemContainer>
        </Fragment>
    );
};

export default ReviewItem;
