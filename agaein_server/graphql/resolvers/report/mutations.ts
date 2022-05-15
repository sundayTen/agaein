import { ApolloError } from 'apollo-server-errors';
import { readAccessToken } from '../../../common/auth/jwtToken';
import { sendEmail } from '../../../common/utils/email';
import { knex } from '../../database';

const reportMutations = {
    createReport: async (_: any, args: any, context: any) => {
        const { files, report } = args;

        let reportResponse: any = {};
        const now = new Date();
        report.createdAt = now;
        report.updatedAt = now;

        if (report.password) {
            report.userId = 1;
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            report.userId = (<any>jwtToken).userId;
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
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

                    const article = await knex('article').where('id', articleId).first();
                    const articleDetail = await knex(`${article.type}`).where('article_id', articleId).first();
                    const user = await knex('user').where('id', article.userId).first();

                    if (articleDetail.alarm) {
                        user.email && sendEmail(user.email, articleId, report.content);
                    }
                })
                .then(() => {
                    return reportResponse;
                })
                .catch((err: any) => {
                    console.error('createReport에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                });
        });
    },
    updateReport: async (_: any, args: any, context: any) => {
        const { id, files, report } = args;

        let reportResponse: any = {};
        const now = new Date();
        report.updatedAt = now;

        const reportPassword = await knex('report').where('id', id).first('password');

        if (reportPassword.password) {
            if (report.password !== reportPassword.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const reportUser = await knex('report').where('id', id).first('user_id');
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (reportUser.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        return await knex.transaction(async (trx: any) => {
            return await knex('report')
                .transacting(trx)
                .update(report)
                .where('id', id)
                .returning('*')
                .then(async (report: any) => {
                    const { articleId } = report[0];

                    reportResponse = report[0];
                    reportResponse.images = [];

                    if (args.files[0]) {
                        await knex('image').transacting(trx).where('report_id', id).del();

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
                    }
                })
                .then(() => {
                    return reportResponse;
                })
                .catch((err: any) => {
                    console.error('updateReport에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error: ' + err.message, 'INTERNAL_SERVER_ERROR');
                });
        });
    },
    deleteReport: async (_: any, args: any, context: any) => {
        const { id, password } = args;

        const report = await knex('report').where('id', id).first();

        if (report === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        if (report.password) {
            if (report.password !== password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (report.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        await knex('report').where('id', id).del();

        return id;
    },
};

export default reportMutations;
