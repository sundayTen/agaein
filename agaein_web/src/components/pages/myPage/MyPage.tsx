import { useEffect, useState } from 'react';

import { MyPageWrap } from './MyPage.style';
import MyInfo from 'components/organism/MyInfo';
import MyArticles from 'components/organism/MyArticles';
import MyBookmarkList from 'components/organism/MyBookmarkList';
import { useProfileLazyQuery, User, Article, ProfileComment, ProfileReport } from 'graphql/generated/generated';

interface Profile {
    user: User;
    lfgs: Article[];
    lfps: Article[];
    comments: ProfileComment[];
    reviews: Article[];
    bookmarks: Article[];
    reports: ProfileReport[];
}

const MyPage = () => {
    const [profile, setProfile] = useState<Profile>();
    const [fetchMe] = useProfileLazyQuery({
        onCompleted: (data) => {
            setProfile(data.profile as Profile);
        },
        onError: (error) => {
            console.warn(error);
        },
    });

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <MyPageWrap>
            <MyInfo user={profile?.user} />
            <MyArticles
                lfgs={profile?.lfgs}
                lfps={profile?.lfps}
                comments={profile?.comments}
                reviews={profile?.reviews}
                reports={profile?.reports}
            />
            <MyBookmarkList bookmarks={profile?.bookmarks} />
        </MyPageWrap>
    );
};

export default MyPage;
