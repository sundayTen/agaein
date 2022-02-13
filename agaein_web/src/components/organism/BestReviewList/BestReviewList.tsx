import { useContext } from 'react';
import { List, Item } from './BestReviewList.style';
import { Board_Type, Article_Order, useGetArticlesQuery, Article } from 'graphql/generated/generated';
import ReviewItem from 'components/molecules/ReviewItem';
import { ModalContext } from 'contexts';
import ReviewDetail from 'components/organism/ReviewDetail';

const BestReviewList = () => {
    const { show } = useContext(ModalContext);
    const boardType = Board_Type.Review;
    const { data, loading, error } = useGetArticlesQuery({
        variables: {
            boardType,
            limit: 4,
            order: Article_Order.View,
        },
    });

    if (loading) return <p>Loading</p>;
    if (error) return <p>{`Error : ${error}`}</p>;

    const reviews = data?.articles.map((review) => review) as Article[];

    return (
        <List>
            {reviews?.map((review) => {
                return (
                    <Item
                        key={review.id}
                        onClick={() =>
                            show({
                                title: review.articleDetail.id + '번째 후기',
                                children: <ReviewDetail review={review} />,
                            })
                        }
                    >
                        <ReviewItem item={review} />
                    </Item>
                );
            })}
        </List>
    );
};

export default BestReviewList;
