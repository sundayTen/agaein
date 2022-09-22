import { getAccessToken, testServer } from './index.test';

test('get breeds', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'query breeds ($type: BREED_TYPE!) { breeds (type: $type) { id } }',
            variables: { type: 'ETC' },
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

test('delete breed', async () => {
    const result = await testServer.executeOperation(
        {
            query: 'mutation deleteBreed ($id: ID!) { deleteBreed (id: $id) }',
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
