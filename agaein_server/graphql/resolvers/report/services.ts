import { Upload } from 'graphql-upload';
import { sendEmail } from '../../../common/utils/email';
import { ID, ReportForm } from '../../customTypes';
import { knex } from '../../database';
import { Report } from '../../types';

export async function getReportsById(id: ID) {
    return await knex('report').where('id', id).first();
}

export async function getReportsByUserId(userId: ID) {
    return await knex('report').where('user_id', userId);
}

export async function getReportsByArticleId(articleId: ID) {
    return await knex('report').where('article_id', articleId);
}

export async function deleteReport(id: ID) {
    await knex('report').where('id', id).del();

    return id;
}

export async function createReport(report: ReportForm, files: Array<Upload>) {
    return await knex.transaction(async (trx: any) => {
        return await knex('report')
            .transacting(trx)
            .insert(report)
            .returning('*')
            .then(async (report: any) => {
                const { articleId, id } = report[0];

                let reportResponse = report[0];
                reportResponse.images = [];

                files.forEach(async (file: any, idx: Number) => {
                    const { createReadStream, mimetype } = await file;
                    const stream = createReadStream();

                    const filename = articleId + '_' + id + '_' + idx + '_' + Date.now() + '.' + mimetype.split('/')[1];

                    const imageForm = {
                        reportId: id,
                        url: 'https://www.agaein.com/file/image/' + filename,
                    };

                    reportResponse.images.push(imageForm.url);

                    await knex('image').transacting(trx).insert(imageForm);

                    const out = require('fs').createWriteStream('image/' + filename);
                    await stream.pipe(out);
                    await stream.on('close', () => {
                        console.log(`${new Date()} store ${filename}`);
                    });
                });

                const article = await knex('article').where('id', articleId).first();
                const articleDetail = await knex(`${article.type}`).where('article_id', articleId).first();
                const user = await knex('user').where('id', article.userId).first();

                if (articleDetail.alarm) {
                    user.email && sendEmail(user.email, articleId, report.content);
                }

                return reportResponse;
            })
            .then((reportResponse: Report) => {
                return reportResponse;
            });
    });
}
