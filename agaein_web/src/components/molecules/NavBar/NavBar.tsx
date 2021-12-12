// @ts-nocheck

import { useContext } from 'react';
import { Nav, AgaeinIconImg, UserTag, ChevronDown, KaKaoLoginButton, KaKaoIcon, Avatar } from './NavBar.style';
import { KAKAO_LOGIN_KEY } from 'config/server';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/userContext';
import Font from '../Font';
import KakaoIcon from 'assets/image/Kakao.png';
import Logo from 'assets/image/agaein_long_logo.png';

interface KaKaoLoginResult {
    response: LoginResponse;
    profile?: UserProfile | undefined;
}

const NavBar = () => {
    const { isLoggedIn, login, user, signOut } = useContext(UserContext);
    const onLoginComplete = (result: KaKaoLoginResult) => {
        login(result.response.access_token, String(result.profile.id));
    };
    const onLoginFailed = (result: KaKaoError) => {
        console.error(result);
    };
    return (
        <Nav>
            <Link to="/">
                <AgaeinIconImg src={Logo} />
            </Link>
            {isLoggedIn ? (
                <UserTag onClick={signOut}>
                    <Avatar src={'https://t1.daumcdn.net/cfile/tistory/27738433597DCB1312'} />
                    <Font label={user.nickname ?? '회원'} fontType="subhead" htmlElement="span" />
                    <ChevronDown />
                </UserTag>
            ) : (
                <KaKaoLoginButton
                    token={KAKAO_LOGIN_KEY}
                    onSuccess={onLoginComplete}
                    onFail={onLoginFailed}
                    getProfile={true}
                    useLoginForm={true}
                    style={{}}
                    type="button"
                >
                    <KaKaoIcon src={KakaoIcon} alt="카카오" />
                    카카오로 시작하기
                </KaKaoLoginButton>
            )}
        </Nav>
    );
};
export default NavBar;
