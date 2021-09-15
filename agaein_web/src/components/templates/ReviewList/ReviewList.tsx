import { useGetArticlesQuery } from 'graphql/generated/generated';
import React from 'react';

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
            {articles?.map((article) => (
                <h1>{`Title : ${article?.title}, Content : ${article?.content}`}</h1>
            ))}
        </div>
    );
};

export default ReviewList;
