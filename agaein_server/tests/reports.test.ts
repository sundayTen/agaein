import { ID } from '../graphql/customTypes';
import { getAccessToken, testServer } from './config';

test('report CRD', async () => {
    const token: string | undefined = getAccessToken();
    const reportId: ID = (
        await testServer.executeOperation(
            {
                query: `
                mutation createReport { 
                    createReport (
                          files: [], report: {
                        articleId: "1",
                        phoneNumber: "1534623",
                        content: "asd",
                        location: {
                          lat: 12.1,
                          lng: 12.1,
                          address: "asdfas",
                          detail: "123asd"
                        },
                        foundDate: "2020-12-12",
                      } ) { id
                  } }
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
    ).data?.createReport.id;

    const report = await testServer.executeOperation(
        {
            query: 'query reports ($articleId: ID!) { reports (articleId: $articleId) { id } }',
            variables: { articleId: '1' },
        },
        {
            req: {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        },
    );

    expect(report.data?.reports[0].id).toStrictEqual(reportId);

    const deletedId: ID = (
        await testServer.executeOperation(
            {
                query: 'mutation deleteReport ($id: ID!) { deleteReport (id: $id) }',
                variables: { id: reportId },
            },
            {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            },
        )
    ).data?.deleteReport;

    expect(deletedId).toStrictEqual(reportId);
});
