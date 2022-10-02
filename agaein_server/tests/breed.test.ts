import { ID } from '../graphql/customTypes';
import { getAccessToken, testServer } from './config';

test('breed CRD', async () => {
    const token: string | undefined = getAccessToken();
    const breedId: ID = (
        await testServer.executeOperation(
            {
                query: `
    mutation {
        createBreed(type: DOG, breed: "테스트") {
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
    ).data?.createBreed.id;

    const breeds = await testServer.executeOperation(
        {
            query: 'query breeds ($type: BREED_TYPE!) { breeds (type: $type) { id } }',
            variables: { type: 'DOG' },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        },
    );

    expect(breeds.data?.breeds[0].id).toStrictEqual(breedId);

    const deletedId = (
        await testServer.executeOperation(
            {
                query: 'mutation deleteBreed ($id: ID!) { deleteBreed (id: $id) }',
                variables: { id: breedId },
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.deleteBreed;

    expect(deletedId).toStrictEqual(breedId);
});
