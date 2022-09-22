import { getAccessToken, testServer } from './index.test';

test('get crawlingResults', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query crawlingResults ($id: ID!) { crawlingResults (id: $id) { age } }',
            variables: { id: '0' },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    const expected: any = [];
    expect(result.data?.crawlingResults).toStrictEqual(expected);
});

test('get crawlingHistory', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query crawlingHistory { crawlingHistory { id } }',
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    const expected: any = [];
    expect(result.data?.crawlingHistory).toStrictEqual(expected);
});