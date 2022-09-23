import { getAccessToken, testServer } from './index.test';

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
