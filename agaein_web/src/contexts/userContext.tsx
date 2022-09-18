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
    const client = useApolloClient();
    const [user, setUser] = useState<User>(NON_MEMBER);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
        const { errors, data } = loginData;
        if (errors) {
            console.warn('Login Error Occur');
            return;
        }
        if (!data) {
            return;
        }
        const { accessToken, refreshToken, ...userData } = data.login;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        fetchMe();
    };

    const signOut = () => {
        client.resetStore();
        resetToken();
        setIsLoggedIn(false);
        setUser(NON_MEMBER);
    };

    const initializeUserContext = async () => {
        const accessToken = getAccessToken();
        if (accessToken) {
            fetchMe();
            return;
        }

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
