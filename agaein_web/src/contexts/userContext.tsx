import { useApolloClient } from '@apollo/client';
import { useLoginMutation, useMeLazyQuery, User } from 'graphql/generated/generated';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
interface UserContextProps {
    user: User;
    isLoggedIn: boolean | null;
    login: (kakaoAccessToken: string, kakaoId: string) => void;
    signOut: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

type UserProviderProps = {
    children: JSX.Element | JSX.Element[] | undefined;
};

const NON_MEMBER: User = {
    id: '1',
    kakaoId: 'anonymous',
} as unknown as User;

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
    const [user, setUser] = useState<User>(NON_MEMBER);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [loginMutation] = useLoginMutation();
    const [fetchMe] = useMeLazyQuery({
        onCompleted: (data) => {
            setIsLoggedIn(true);
            setUser(data.me as User);
        },
    });
    const cookies = new Cookies();

    const getAccessToken = () => {
        return cookies.get('accessToken');
    };

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
                pw: process.env.REACT_APP_PASSWORD as string,
            },
        });
        console.log('🚀 DATA :  ~ loginData', loginData);
        const { errors, data } = loginData;
        if (errors) {
            console.warn('Login Error Occur');
            return;
        }
        if (!data) {
            return;
        }
        const { accessToken, refreshToken } = data.login;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        fetchMe();
    };

    const signOut = () => {
        try {
            setIsLoggedIn(false);
            resetToken();
            setUser(NON_MEMBER);
        } catch (error) {
            console.error('로그아웃 중 에러', error);
        }
    };

    const initializeUserContext = async () => {
        const accessToken = getAccessToken();
        try {
            if (accessToken) {
                fetchMe();
                return;
            }
        } catch (error) {}

        setIsLoggedIn(false);
    };

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
