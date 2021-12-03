import { useState } from 'react';
import { PhotographIcon } from '@heroicons/react/outline';
import {
    ReviewInfo,
    ReviewCount,
    Count,
    ReviewTable,
    ReviewPagination,
} from 'components/pages/review/ReviewList.style';
import { Board_Type, useGetArticlesQuery, Review, User, Article_Order } from 'graphql/generated/generated';
import { YYYY_MM_DD } from 'utils/date';
import { Pagination } from 'components/molecules';

// ? articleDetail type 이 LFG 로 되어있어서 따로 선언해줬는데 Review 로 바꿀 방법을 모르겠음
interface ReviewInterface {
    id: string;
    images: string[];
    view: number;
    type: Board_Type;
    articleDetail: Review;
    author: User;
    createdAt: string;
    updatedAt: string;
}

const AllReviewList = () => {
    const boardType = Board_Type.Review;
    const [page, setPage] = useState(1);
    const ITEM_PER_PAGE = 12;
    const [orderType, setOrderType] = useState<Article_Order>(Article_Order.New);
    const [orderSelected, setOrderSelected] = useState('new');

    const { data, loading, error } = useGetArticlesQuery({
        variables: {
            boardType,
            limit: 12,
            offset: (page - 1) * ITEM_PER_PAGE,
            order: orderType,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;

    const reviews = data?.articles.map((review) => review) as ReviewInterface[];

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.value;
        setOrderSelected(selectValue);

        switch (selectValue) {
            case 'new':
                setOrderType(Article_Order.New);
                break;
            case 'old':
                setOrderType(Article_Order.Old);
                break;
            case 'view':
                setOrderType(Article_Order.View);
                break;
            default:
                console.log(`error`);
        }
    };

    return (
        <>
            <ReviewInfo>
                <ReviewCount>
                    총 <Count>146</Count>건
                </ReviewCount>
                {/* TODO: 셀렉트 컴포넌트 완성되면 변경예정 */}
                <select onChange={selectHandler} value={orderSelected}>
                    <option value="new">최신순</option>
                    <option value="old">등록일순</option>
                    <option value="view">조회순</option>
                </select>
            </ReviewInfo>
            <ReviewTable>
                <colgroup>
                    <col width="120"></col>
                    <col width="*"></col>
                    <col width="86"></col>
                    <col width="100"></col>
                    <col width="120"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews?.map((review) => {
                        return (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>
                                    {review.articleDetail.title}
                                    {review.images.length !== 0 && <PhotographIcon />}
                                </td>
                                <td>{review.view}</td>
                                <td>{review.author.kakaoId}</td>
                                <td>{YYYY_MM_DD(review.createdAt)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </ReviewTable>
            <ReviewPagination>
                <Pagination active={page} setActive={setPage} />
            </ReviewPagination>
        </>
    );
};

export default AllReviewList;
