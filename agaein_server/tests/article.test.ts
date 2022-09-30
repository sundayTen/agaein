import { getAccessToken, testServer } from './config';

test('get article', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query article ($id: ID!) { article (id: $id) { age } }',
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

    expect(result.data === undefined).toStrictEqual(true);
});

test('get articleLength', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query articleLength ($boardType: BOARD_TYPE!) { articleLength (boardType: $boardType) }',
            variables: { boardType: 'ANANYMOUS' },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${getAccessToken()}`,
                },
            },
        },
    );

    expect(result.data === undefined).toStrictEqual(true);
});

test('delete article', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'mutation deleteArticle ($id: ID!) { deleteArticle (id: $id) }',
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

test('delete comment', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'mutation deleteComment ($id: ID!) { deleteComment (id: $id) }',
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
