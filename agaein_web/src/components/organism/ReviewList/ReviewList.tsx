import ReviewItem from 'components/organism/ReviewList/ReviewItem/ReviewItem';
import { Board_Type, useGetArticlesQuery } from 'graphql/generated/generated';
import { ListContainer, ListItem } from './ReviewList.style';
import ReviewListHeader from './ReviewListHeader';

const ReviewList = () => {
    const { data, loading, error } = useGetArticlesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            boardType: Board_Type.Lfg,
        },
    });

    if (error) {
        console.log(error);
    }

    if (loading) {
        return <></>;
    }

    const articles = data?.Articles.map((article) => article?.info);

    return (
        <>
            <ReviewListHeader />
            <ListContainer>
                {articles?.map((article, index) => (
                    <ListItem key={index.toString()}>
                        <ReviewItem title={article?.title} description={article?.content} />
                    </ListItem>
                ))}
            </ListContainer>
        </>
    );
};

export default ReviewList;
