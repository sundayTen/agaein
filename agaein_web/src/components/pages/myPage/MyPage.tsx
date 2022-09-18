import { MyPageWrap } from './MyPage.style';
import MyInfo from 'components/organism/MyInfo';
import MyArticles from 'components/organism/MyArticles';
import MyBookmarkList from 'components/organism/MyBookmarkList';
import { RouteComponentProps } from 'react-router-dom';
import { MyPageParams } from 'router/params';

const MyPage = ({ match }: RouteComponentProps<MyPageParams>) => {
    const { id } = match.params;

    return (
        <MyPageWrap>
            <MyInfo id={id} />
            <MyArticles />
            <MyBookmarkList />
        </MyPageWrap>
    );
};

export default MyPage;
