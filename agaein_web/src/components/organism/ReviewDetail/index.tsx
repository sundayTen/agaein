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
import { useContext } from 'react';
import { ModalContext } from 'contexts';

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
    const { update } = useContext(ModalContext);
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: props.id,
        },
        onError: (error) => {
            update({
                title:"에러가 발생했어요",
                content:"조금 뒤에 다시 시도해주세요"
            })
            console.error(error.message, error.graphQLErrors);
        },
        fetchPolicy:"cache-and-network"
    });
    if (loading) return <p>Loading...</p>;
    if (data === undefined||error || !isArticle(data.article)) return <p>No data</p>;

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
                        {images.map((image, index) => (
                        <ReviewImage key={(JSON.stringify(image)+index).toString()}>
                                <img src={image ? image : ''} alt="리뷰 사진들"/>
                            </ReviewImage>
                        ))}
                    </Slider>
                ) : (
                    <ReviewImage>
                        <img src={penguin} alt="리뷰 사진"/>
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
