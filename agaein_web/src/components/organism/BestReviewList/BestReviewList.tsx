import { List, Item } from './BestReviewList.style';
import { Board_Type, Article_Order, useGetArticlesQuery, Article } from 'graphql/generated/generated';
import ReviewItem from 'components/molecules/ReviewItem';

const BestReviewList = () => {
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
                    <Item key={review.id}>
                        <ReviewItem item={review} />
                    </Item>
                );
            })}
        </List>
    );
};

export default BestReviewList;
