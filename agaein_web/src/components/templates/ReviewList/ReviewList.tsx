import { useGetArticlesQuery } from 'graphql/generated/generated';

const ReviewList = () => {
    const { data, loading, error } = useGetArticlesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            boardType: 'LFP',
        },
    });

    if (loading) return <></>;
    const articles = data?.Articles.map((article) => article?.info);

    return (
        <div>
            {/* h1대신 Carousel 컴포넌트가 와야 함. 테스트용 코드 */}
            {articles?.map((article) => (
                <h1>{`Title : ${article?.title}, Content : ${article?.content}`}</h1>
            ))}
        </div>
    );
};

export default ReviewList;
