// @ts-nocheck

import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import {
    Header,
    AgaeinIconImg,
    UserInfo,
    UserTag,
    ChevronDown,
    KaKaoLoginButton,
    KaKaoIcon,
    Avatar,
    UserDropbox,
    DropboxItem,
} from './NavBar.style';
import { KAKAO_LOGIN_KEY } from 'config/server';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/userContext';
import KakaoIcon from 'assets/image/Kakao.png';
import Logo from 'assets/image/agaein_long_logo.png';

interface KaKaoLoginResult {
    response: LoginResponse;
    profile?: UserProfile | undefined;
}

const NavBar = () => {
    const history = useHistory();
    const [isShowDropBox, setIsShowDropBox] = useState(false);
    const { isLoggedIn, login, user, signOut } = useContext(UserContext);

    const onLoginComplete = (result: KaKaoLoginResult) => {
        login(result.response.access_token, String(result.profile.id));
    };

    const onLoginFailed = (result: KaKaoError) => {
        console.error(result);
    };

    const handleMyPageButton = () => {
        setIsShowDropBox(false);
        history.push('/myPage');
    };

    const handleLogoutButton = () => {
        setIsShowDropBox(false);
        signOut();
    };

    return (
        <Header>
            <Link to="/" aria-label="홈으로 가는 링크">
                <AgaeinIconImg src={Logo} alt="네비바 로고" />
            </Link>
            {isLoggedIn === null ? (
                <></>
            ) : isLoggedIn ? (
                <UserInfo>
                    <UserTag type="button" onClick={() => setIsShowDropBox(!isShowDropBox)}>
                        <Avatar src={user.profileUrl ?? 'https://t1.daumcdn.net/cfile/tistory/27738433597DCB1312'} />
                        {user.nickname ?? '회원'}
                        <ChevronDown />
                    </UserTag>
                    {isShowDropBox && (
                        <UserDropbox>
                            <DropboxItem type="button" onClick={handleMyPageButton}>
                                마이페이지
                            </DropboxItem>
                            <DropboxItem type="button" onClick={handleLogoutButton}>
                                로그아웃
                            </DropboxItem>
                        </UserDropbox>
                    )}
                </UserInfo>
            ) : (
                <KaKaoLoginButton
                    token={KAKAO_LOGIN_KEY}
                    onSuccess={onLoginComplete}
                    onFail={onLoginFailed}
                    getProfile
                    useLoginForm
                    type="button"
                >
                    <KaKaoIcon src={KakaoIcon} alt="카카오" />
                    카카오로 시작하기
                </KaKaoLoginButton>
            )}
        </Header>
    );
};
export default NavBar;
