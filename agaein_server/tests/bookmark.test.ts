import { ID } from '../graphql/customTypes';
import { getAccessToken, testServer } from './config';

test('bookmark CRD', async () => {
    const token: string | undefined = getAccessToken();
    const bookmarkId: ID = (
        await testServer.executeOperation(
            {
                query: `
                mutation {
                    createBookmark(articleId: 1) {
                    id
                  }
                }
    `,
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.createBookmark.id;

    const bookmarks = await testServer.executeOperation(
        {
            query: 'query bookmarks { bookmarks { id } }',
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        },
    );

    expect(bookmarks.data?.bookmarks[0].id).toStrictEqual(bookmarkId);

    const deletedId = (
        await testServer.executeOperation(
            {
                query: 'mutation deleteBookmark ($id: ID!) { deleteBookmark (id: $id) }',
                variables: { id: bookmarkId },
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.deleteBookmark;

    expect(deletedId).toStrictEqual(bookmarkId);
});
