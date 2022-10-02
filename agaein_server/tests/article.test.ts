import { ID } from '../graphql/customTypes';
import { getAccessToken, testServer } from './config';

test('article CRD + Length', async () => {
    const token: string | undefined = getAccessToken();
    const articleId: ID = (
        await testServer.executeOperation(
            {
                query: `
        mutation createArticle { createArticle (
            boardType: LFP, files: [], articleDetail: {
                breedId: 1,
                name: "123",
                feature: "123",
                gender: MALE,
                location: {
                    lat: 12.1,
                    lng: 12.1,
                    address: "asdfas",
                    detail: "123asd"
                },
                keyword: ["asdd", "asd", "dasd"]
                lostDate: "2020-12-12",
                gratuity: 1234,
                alarm: false,
                age: 1,
            } ) { 
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
    ).data?.createArticle.id;

    const article: any = await testServer.executeOperation(
        {
            query: 'query article ($id: ID!) { article (id: $id) { articleDetail { ... on LFP { age gratuity } } } }',
            variables: { id: articleId },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        },
    );

    expect(article.data?.article.articleDetail.age).toStrictEqual(1);
    expect(article.data?.article.articleDetail.gratuity).toStrictEqual(1234);

    const articleLength: number = (
        await testServer.executeOperation(
            {
                query: 'query articleLength ($boardType: BOARD_TYPE!) { articleLength (boardType: $boardType) }',
                variables: { boardType: 'LFP' },
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.articleLength;

    expect(articleLength).toStrictEqual(2);

    const deletedId: ID = (
        await testServer.executeOperation(
            {
                query: 'mutation deleteArticle ($id: ID!) { deleteArticle (id: $id) }',
                variables: { id: articleId },
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.deleteArticle;

    expect(deletedId).toStrictEqual(articleId);
});
