import { getAccessToken, testServer } from './config';

test('get bookmarks', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query bookmarks { bookmarks { id } }',
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
    expect(result.data?.bookmarks).toStrictEqual(expected);
});
