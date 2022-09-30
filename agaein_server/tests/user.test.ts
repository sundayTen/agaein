import { getAccessToken, testServer } from './config';

test('get user', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query user ($id: ID!) { user (id: $id) { id } }',
            variables: { id: '17' },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    const expected: any = { id: '17' };
    expect(JSON.stringify(result.data?.user)).toStrictEqual(JSON.stringify(expected));
});

test('get profile', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query profile { profile { user { id } } }',
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    const expected: any = { id: '17' };
    expect(JSON.stringify(result.data?.profile?.user)).toStrictEqual(JSON.stringify(expected));
});

test('get me', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query me { me { id } }',
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    const expected: any = { id: '17' };
    expect(JSON.stringify(result.data?.me)).toStrictEqual(JSON.stringify(expected));
});

test('login test', async () => {
    const result = await testServer.executeOperation({
        query: 'mutation login($kakaoId: String!, $pw: String!) { login(kakaoId: $kakaoId, pw: $pw) { accessToken } }',
        variables: { kakaoId: '1234567890', pw: process.env.LOGIN_PW },
    });

    expect(result.data?.login.accessToken !== undefined).toBe(true);
});
