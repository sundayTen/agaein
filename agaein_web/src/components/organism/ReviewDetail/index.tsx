import { Article, Review } from 'graphql/generated/generated';
import {
    ReviewBody,
    ReviewHeader,
    ReviewAuthor,
    ReviewInfo,
    ReviewImages,
    ReviewImage,
    ReviewContent,
    ReviewTitle,
    ReviewText,
    ReviewArrowIcon,
} from './ReviewDetail.style';
import Slider, { Settings } from 'react-slick';
import { formattedDate } from 'utils/date';
import penguin from 'assets/image/penguin.png';

interface ReviewDetailProps {
    review: Article;
}

const ReviewDetail = (props: ReviewDetailProps) => {
    const { author, createdAt, images, view } = props.review;
    const { title, content } = props.review.articleDetail as Review;

    const settingsIntro: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <ReviewArrowIcon direction="prev" />,
        nextArrow: <ReviewArrowIcon direction="next" />,
    };

    return (
        <ReviewBody>
            <ReviewHeader>
                <ReviewAuthor>{author.nickname}</ReviewAuthor>
                <ReviewInfo>
                    조회수: {view}
                    <br />
                    작성일: {formattedDate(createdAt)}
                </ReviewInfo>
            </ReviewHeader>
            <ReviewImages>
                {images.length !== 0 ? (
                    <Slider {...settingsIntro}>
                        {images.map((image) => (
                            <ReviewImage>
                                <img src={image ? image : ''} />
                            </ReviewImage>
                        ))}
                    </Slider>
                ) : (
                    <ReviewImage>
                        <img src={penguin} />
                    </ReviewImage>
                )}
            </ReviewImages>
            <ReviewContent>
                <ReviewTitle>{title}</ReviewTitle>
                <ReviewText>{content}</ReviewText>
            </ReviewContent>
        </ReviewBody>
    );
};

export default ReviewDetail;
