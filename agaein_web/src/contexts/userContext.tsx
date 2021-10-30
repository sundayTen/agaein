import { useApolloClient } from '@apollo/client';
import { useLoginMutation, useMeLazyQuery, User } from 'graphql/generated/generated';
import { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
interface UserContextProps {
    user: User;
    isLoggedIn: boolean;
    login: (kakaoAccessToken: string, kakaoId: string) => void;
    signOut: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

type UserProviderProps = {
    children: JSX.Element | JSX.Element[] | undefined;
};

const NON_MEMBER: User = {
    id: '1',
    kakaoId: 'non-member',
    email: 'non-member@agaein.com',
    nickname: 'anyone',
} as User;

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
    const client = useApolloClient();
    const [user, setUser] = useState<User>(NON_MEMBER);
    console.log('🚀 ~ file: userContext.tsx ~ line 28 ~ user', user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginMutation] = useLoginMutation();
    const [fetchMe] = useMeLazyQuery({
        onCompleted: (data) => {
            setIsLoggedIn(true);
            setUser(data.me as User);
        },
        onError: (error) => {
            console.warn(error);
        },
    });
    const cookies = new Cookies();

    const getAccessToken = () => {
        return cookies.get('accessToken');
    };
    // const getRefreshToken = () => {
    //     return cookies.get('refreshToken');
    // };

    const setAccessToken = (accessToken: string) => {
        cookies.set('accessToken', accessToken);
    };

    const setRefreshToken = (refreshToken: string) => {
        cookies.set('refreshToken', refreshToken);
    };
    const resetToken = () => {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
    };

    const login = async (kakaoAccessToken: string, kakaoId: string) => {
        setAccessToken(kakaoAccessToken);
        const loginData = await loginMutation({
            variables: {
                kakaoId,
            },
        });
        const { errors, data } = loginData;
        if (errors) {
            // TODO : Login 실패 시 로직(카카오 로그인 실패와 달라야 함)
            console.warn('Login Error Occur');
            return;
        }
        if (!data) {
            return;
        }
        const { accessToken, refreshToken, ...userData } = data.login;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(userData as User);
        setIsLoggedIn(true);
    };

    const signOut = () => {
        client.resetStore();
        resetToken();
        setIsLoggedIn(false);
        setUser(NON_MEMBER);
    };

    const initializeUserContext = useCallback(async () => {
        const accessToken = getAccessToken();
        console.log('🚀 ~ file: userContext.tsx ~ line 99 ~ initializeUserContext ~ accessToken', accessToken);
        if (accessToken) {
            fetchMe();
        }
    }, []);

    useEffect(() => {
        initializeUserContext();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                signOut,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
