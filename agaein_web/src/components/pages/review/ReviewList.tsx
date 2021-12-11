import PageTitle from 'components/organism/PageTitle/PageTitle';
import { BestReview, BestReviewTitle } from './ReviewList.style';
import BestReviewList from 'components/organism/BestReviewList/BestReviewList';
import AllReviewList from 'components/organism/AllReviewList/AllReviewList';

const ReviewList = () => {
    return (
        <>
            <PageTitle title="후기 전체보기" subTitle="소중한 가족과 다시 만난 이야기입니다" />
            <BestReview>
                <BestReviewTitle>베스트 포토 후기</BestReviewTitle>
            </BestReview>
            <BestReviewList />
            <AllReviewList />
        </>
    );
};

export default ReviewList;
