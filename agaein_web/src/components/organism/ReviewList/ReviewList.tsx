import ReviewItem from 'components/organism/ReviewList/ReviewItem/ReviewItem';
import { client } from 'graphql/apollo';
import { Board_Type, GetArticlesDocument, useGetArticlesQuery } from 'graphql/generated/generated';
import { ListContainer, ListItem } from './ReviewList.style';
import ReviewListHeader from './ReviewListHeader';

const ReviewList = () => {
    const { data, loading, error } = useGetArticlesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            boardType: Board_Type.Lfg,
        },
        onCompleted: (data) => {
            const cached = client.readQuery({
                query: GetArticlesDocument,
                variables: {
                    Board_Type: Board_Type.Lfg,
                },
            });
            console.log(cached);
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
                    <ListItem>
                        <ReviewItem key={index.toString()} title={article?.title} description={article?.content} />
                    </ListItem>
                ))}
            </ListContainer>
        </>
    );
};

export default ReviewList;
