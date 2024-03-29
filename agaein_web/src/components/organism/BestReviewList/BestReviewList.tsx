import { useContext } from 'react';
import { List, Item } from './BestReviewList.style';
import { Board_Type, Article_Order, useGetArticlesQuery, Article, PagingArticle } from 'graphql/generated/generated';
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

    if (data?.articles.articles.length === 0) return <p>등록된 게시글이 없습니다.</p>;

    const { articles, currentPage, totalPage } = data?.articles as PagingArticle;

    const reviews = articles.map((review) => review) as Article[];

    return (
        <List>
            {reviews?.map((review) => {
                return (
                    <Item
                        key={review.id}
                        onClick={() =>
                            show({
                                title: review?.id + '번째 후기',
                                children: <ReviewDetail id={review.id} />,
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
