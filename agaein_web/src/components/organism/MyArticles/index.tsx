import {
    MyArticleButtons,
    MyArticleTableArea,
    MyArticleButton,
    StatusIcon,
} from 'components/pages/myPage/MyPage.style';
import { Button } from 'components/molecules';

const MyArticles = () => {
    return (
        <>
            <MyArticleButtons>
                <MyArticleButton type="button" active={false}>
                    찾고 있어요
                </MyArticleButton>
                <MyArticleButton type="button" active={true}>
                    발견 했어요
                </MyArticleButton>
            </MyArticleButtons>
            <MyArticleTableArea>
                <table>
                    <thead>
                        <tr>
                            <th>상태</th>
                            <th>제목</th>
                            <th>후기</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <StatusIcon status="active">진행중</StatusIcon>
                            </td>
                            <td>
                                <a href="">
                                    서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                </a>
                            </td>
                            <td></td>
                            <td>162</td>
                        </tr>
                        <tr>
                            <td>
                                <StatusIcon status="stop">중단</StatusIcon>
                            </td>
                            <td>
                                <a href="">
                                    서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                </a>
                            </td>
                            <td>
                                <Button label="후기 작성" onClick={() => {}} buttonStyle="BLACK" size="SMALL" />
                            </td>
                            <td>162</td>
                        </tr>
                        <tr>
                            <td>
                                <StatusIcon status="complete">완료</StatusIcon>
                            </td>
                            <td>
                                <a href="">
                                    서울 송파구에서 강아지(치와와)를 찾고있어요 <span className="count">(3)</span>
                                </a>
                            </td>
                            <td>
                                <Button label="후기 작성" onClick={() => {}} buttonStyle="BLACK" size="SMALL" />
                            </td>
                            <td>162</td>
                        </tr>
                    </tbody>
                </table>
            </MyArticleTableArea>
        </>
    );
};

export default MyArticles;
