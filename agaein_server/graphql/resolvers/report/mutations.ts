import { ApolloError } from 'apollo-server-errors';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const reportMutations = {
    createReport: async (_: any, args: any, context: any) => {
        const { files, report } = args;

        let reportResponse: any = {};
        const now = new Date();
        report.createdAt = now;
        report.updatedAt = now;

        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            report.userId = (<any>jwtToken).userId;
        } else {
            report.userId = 1;
        }

        return await knex.transaction(async (trx: any) => {
            return await knex('report')
                .transacting(trx)
                .insert(report)
                .returning('*')
                .then(async (report: any) => {
                    const { articleId, id } = report[0];

                    reportResponse = report[0];
                    reportResponse.images = [];

                    files.forEach(async (file: any, idx: Number) => {
                        const { createReadStream, mimetype } = await file;
                        const stream = createReadStream();

                        const filename =
                            articleId + '_' + id + '_' + idx + '_' + Date.now() + '.' + mimetype.split('/')[1];

                        const imageForm = {
                            reportId: id,
                            url: 'https://www.agaein.com/file/image/' + filename,
                        };

                        reportResponse.images.push(imageForm.url);

                        await knex('image').transacting(trx).insert(imageForm);

                        const out = require('fs').createWriteStream('image/' + filename);
                        await stream.pipe(out);
                        await stream.on('close', () => {
                            console.log(`store ${filename}`);
                        });
                    });
                })
                .then(() => {
                    return reportResponse;
                })
                .catch(() => {
                    console.error('createReport에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
                });
        });
    },
};

export default reportMutations;
