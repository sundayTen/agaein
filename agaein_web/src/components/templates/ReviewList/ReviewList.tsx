import ReviewItem from 'components/molcules/ReviewItem/ReviewItem';
import { useGetArticlesQuery } from 'graphql/generated/generated';
import { ListContainer, ListItem } from './ReviewList.style';

const ReviewList = () => {
    const { data, loading, error } = useGetArticlesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            boardType: 'LFP',
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
        <ListContainer>
            {/* h1대신 Carousel 컴포넌트가 와야 함. 테스트용 코드 // key는 index말고 id가 와야함*/}
            {articles?.map((article, index) => (
                <ListItem>
                    <ReviewItem key={index.toString()} title={article?.title} description={article?.content} />
                </ListItem>
            ))}
        </ListContainer>
    );
};

export default ReviewList;
