import { Review, useGetArticleQuery } from 'graphql/generated/generated';
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
import { useApolloClient } from '@apollo/client';
import { isArticle } from 'utils/typeGuards';

const settingsIntro: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ReviewArrowIcon direction="prev" />,
    nextArrow: <ReviewArrowIcon direction="next" />,
};

interface ReviewDetailProps {
    id: string;
}

const ReviewDetail = (props: ReviewDetailProps) => {
    const client = useApolloClient();

    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: props.id,
        },
        onCompleted: (data) => {
            client.cache.modify({
                id: `Article:${data.article?.id}`,
                fields: {
                    view: (prevViewCount) => prevViewCount + 1,
                },
            });
        },
        onError: (error) => {
            console.error(error.message, error.graphQLErrors);
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    if (data === undefined || !isArticle(data.article)) return <p>No data</p>;

    const { author, createdAt, images, view } = data.article;
    const { title, content } = data?.article?.articleDetail as Review;

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
