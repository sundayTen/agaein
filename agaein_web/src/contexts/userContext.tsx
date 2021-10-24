import { useLoginMutation, useMeLazyQuery, User } from 'graphql/generated/generated';
import { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

interface UserContextProps {
    user: User;
    isLoggedIn: boolean;
    login: (accessToken: string, email: string) => void;
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
    const [user, setUser] = useState<User>(NON_MEMBER);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginMutation] = useLoginMutation();
    const [fetchMe] = useMeLazyQuery({
        onCompleted: (data) => {
            setUser(data.me as User);
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

    const login = async (accessToken: string, email: string) => {
        setAccessToken(accessToken);
        const loginData = await loginMutation({
            variables: {
                kakaoId: email,
            },
        });
        const { errors, data } = loginData;
        if (errors) {
            // TODO : Login 실패 시 로직(카카오 로그인 실패와 달라야 함)
            console.warn('Login Error Occur');
            return;
        }
        setIsLoggedIn(true);
        setUser(data?.login as User);
    };

    const signOut = () => {
        setAccessToken('');
        setRefreshToken('');
        setIsLoggedIn(false);
        setUser(NON_MEMBER);
    };

    const initializeUserContext = useCallback(async () => {
        const accessToken = getAccessToken();
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
