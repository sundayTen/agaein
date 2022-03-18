import { MyPageWrap, MyPageSection, SectionHeader, HeaderItem, SectionBox } from './MyPage.style';
import MyInfo from 'components/organism/MyInfo';
import MyArticles from 'components/organism/MyArticles';
import MyBookmarkList from 'components/organism/MyBookmarkList';

const MyPage = () => {
    return (
        <MyPageWrap>
            <MyPageSection>
                <SectionHeader>
                    <HeaderItem className="active" type="button">
                        내 정보 수정
                    </HeaderItem>
                </SectionHeader>
                <SectionBox>
                    <MyInfo />
                </SectionBox>
            </MyPageSection>
            <MyPageSection>
                <SectionHeader>
                    <HeaderItem className="active" type="button">
                        내가 쓴 게시글
                    </HeaderItem>
                    <HeaderItem type="button">내가 쓴 댓글</HeaderItem>
                    <HeaderItem type="button">내 발견 내역</HeaderItem>
                    <HeaderItem type="button">나의 후기</HeaderItem>
                </SectionHeader>
                <SectionBox>
                    <MyArticles />
                </SectionBox>
            </MyPageSection>
            <MyPageSection>
                <SectionHeader>
                    <HeaderItem className="active" type="button">
                        나의 북마크
                    </HeaderItem>
                </SectionHeader>
                <MyBookmarkList />
            </MyPageSection>
        </MyPageWrap>
    );
};

export default MyPage;
