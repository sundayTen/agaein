import { MyPageWrap } from './MyPage.style';
import MyInfo from 'components/organism/MyInfo';
import MyArticles from 'components/organism/MyArticles';
import MyBookmarkList from 'components/organism/MyBookmarkList';

const MyPage = () => {
    return (
        <MyPageWrap>
            <MyInfo />
            <MyArticles />
            <MyBookmarkList />
        </MyPageWrap>
    );
};

export default MyPage;
