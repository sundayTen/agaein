import React from 'react';
import { Title, SeeAllStuff, ReviewListHeaderContainer } from './ReviewListHeader.style';

const ReviewListHeader = () => {
    return (
        <ReviewListHeaderContainer>
            <Title>찾은 후기</Title>
            <SeeAllStuff>{'전체 보기 >'}</SeeAllStuff>
        </ReviewListHeaderContainer>
    );
};

export default ReviewListHeader;
