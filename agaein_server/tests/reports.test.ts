import { getAccessToken, testServer } from './index.test';

test('get reports', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query reports ($articleId: ID!) { reports (articleId: $articleId) { id } }',
            variables: { articleId: '0' },
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
    expect(result.data?.reports).toStrictEqual(expected);
});

test('delete report', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'mutation deleteReport ($id: ID!) { deleteReport (id: $id) }',
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

    expect(result.data === null).toStrictEqual(true);
});
