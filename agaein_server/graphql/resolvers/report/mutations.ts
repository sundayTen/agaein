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

        // @TODO 패스워드가 없으면 바로 생성이나 수정인데, 피그마 상에는 패스워드가 없었음. 이 부분 무조건 회원만 가능한건가?
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
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
    updateReport: async (_: any, args: any, context: any) => {
        const { id, files, report } = args;

        let reportResponse: any = {};
        const now = new Date();
        report.updatedAt = now;

        // @TODO 패스워드가 없으면 바로 생성이나 수정인데, 피그마 상에는 패스워드가 없었음. 이 부분 무조건 회원만 가능한건가?
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
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
                .catch(() => {
                    console.error('createReport에서 에러발생');
                    console.trace();

                    throw new ApolloError('DataBase Server Error', 'INTERNAL_SERVER_ERROR');
                });
        });
    },
    deleteReport: async (_: any, args: any, context: any) => {
        const report = await knex('report').where('id', args.id).first();

        if (report === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        // @TODO 패스워드가 없으면 바로 생성이나 수정인데, 피그마 상에는 패스워드가 없었음. 이 부분 무조건 회원만 가능한건가?
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            if (report.userId !== (<any>jwtToken).userId) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        await knex('report').where('id', args.id).del();

        return args.id;
    },
};

export default reportMutations;
