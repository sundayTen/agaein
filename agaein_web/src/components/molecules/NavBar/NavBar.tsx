// @ts-nocheck

import { useContext } from 'react';
import { Nav, Title, AgaeinIconImg, UserTag, ChevronDown, KaKaoLoginButton, KaKaoIcon } from './NavBar.style';
import { KAKAO_LOGIN_KEY } from 'config/server';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/userContext';
import Font from '../Font';
import KakaoIcon from 'assets/image/Kakao.png';

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
                <Title>
                    <AgaeinIconImg alt="로고" src="https://img.icons8.com/ios/50/000000/github--v1.png" />
                    AGAEIN
                </Title>
            </Link>
            {isLoggedIn ? (
                <UserTag onClick={signOut}>
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
