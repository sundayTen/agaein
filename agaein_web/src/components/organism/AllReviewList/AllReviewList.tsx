import { useState, useCallback, useEffect, useContext } from 'react';
import { PhotographIcon } from '@heroicons/react/outline';
import {
    ReviewInfo,
    ReviewCount,
    Count,
    ReviewTable,
    ReviewPagination,
} from 'components/pages/review/ReviewList.style';
import { Board_Type, useGetArticlesLazyQuery, Review, Article, Article_Order } from 'graphql/generated/generated';
import { YYYY_MM_DD } from 'utils/date';
import { Pagination } from 'components/molecules';
import { ModalContext } from 'contexts';
import ReviewDetail from 'components/organism/ReviewDetail';

const AllReviewList = () => {
    const boardType = Board_Type.Review;
    const [page, setPage] = useState(1);
    const ITEM_PER_PAGE = 12;
    const [orderType, setOrderType] = useState<Article_Order>(Article_Order.New);
    const { show } = useContext(ModalContext);

    const [get, { data, loading, error }] = useGetArticlesLazyQuery();

    const getArticles = useCallback(() => {
        get({
            variables: {
                boardType,
                limit: 12,
                offset: (page - 1) * ITEM_PER_PAGE,
                order: orderType,
            },
        });
    }, [orderType, page, boardType, get]);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;

    const reviews = data?.articles.map((review) => review) as Article[];

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.value as Article_Order;
        setOrderType(selectValue);
    };

    return (
        <>
            <ReviewInfo>
                <ReviewCount>
                    총 <Count>146</Count>건
                </ReviewCount>
                {/* TODO: 셀렉트 컴포넌트 완성되면 변경예정 */}
                <select onChange={selectHandler} value={orderType}>
                    <option value={Article_Order.New}>최신순</option>
                    <option value={Article_Order.Old}>등록일순</option>
                    <option value={Article_Order.View}>조회순</option>
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
                        const { id, images, view, author, createdAt } = review!;
                        const { title } = review?.articleDetail as Review;
                        return (
                            <tr
                                key={id}
                                onClick={() =>
                                    show({
                                        title: review.articleDetail.id + '번째 후기',
                                        children: <ReviewDetail id={id} />,
                                    })
                                }
                            >
                                <td>{id}</td>
                                <td>
                                    {title}
                                    {images.length !== 0 && <PhotographIcon />}
                                </td>
                                <td>{view}</td>
                                <td>{author.nickname}</td>
                                <td>{YYYY_MM_DD(createdAt)}</td>
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
