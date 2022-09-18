import { ApolloError } from 'apollo-server-errors';
import { getUserId } from '../../../common/auth/jwtToken';
import { Date, RawReport, ReportForm } from '../../customTypes';
import { MutationCreateReportArgs } from '../../types';
import { createReport, deleteReport, getReportsById } from './services';

const reportMutations = {
    createReport: async (_: any, createReportRequest: MutationCreateReportArgs, context: any) => {
        const { files, report } = createReportRequest;
        const now: Date = new Date();
        const reportForm: ReportForm = {
            createdAt: now,
            updatedAt: now,
            ...report,
        };

        const authorization: string = context.req.headers.authorization;
        reportForm.userId = 1;
        if (authorization && authorization.split(' ')[1]) {
            reportForm.userId = getUserId(authorization);
        }

        return await createReport(reportForm, files);
    },
    deleteReport: async (_: any, deleteReportRequest: any, context: any) => {
        const report: RawReport = await getReportsById(deleteReportRequest.id);

        if (report === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        const authorization: string = context.req.headers.authorization;
        if (authorization && authorization.split(' ')[1]) {
            if (report.userId != getUserId(authorization)) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        return await deleteReport(deleteReportRequest.id);
    },
};

export default reportMutations;
