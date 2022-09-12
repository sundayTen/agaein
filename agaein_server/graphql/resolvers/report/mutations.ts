import { ApolloError } from 'apollo-server-errors';
import { getUserId } from '../../../common/auth/jwtToken';
import { Date, RawReport, ReportForm, UpdateReportForm } from '../../customTypes';
import { MutationCreateReportArgs, MutationUpdateReportArgs } from '../../types';
import { createReport, deleteReport, getReportsById, updateReport } from './services';

const reportMutations = {
    createReport: async (_: any, createReportRequest: MutationCreateReportArgs, context: any) => {
        const { files, report } = createReportRequest;
        const now: Date = new Date();
        const reportForm: ReportForm = {
            createdAt: now,
            updatedAt: now,
            ...report,
        };

        // @TODO 패스워드 해시
        const authorization: string = context.req.headers.authorization;
        if (report.password) {
            reportForm.userId = 1;
        } else if (authorization && authorization.split(' ')[1]) {
            reportForm.userId = getUserId(authorization);
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        return await createReport(reportForm, files);
    },
    updateReport: async (_: any, updateReportRequest: MutationUpdateReportArgs, context: any) => {
        const { id, files, report } = updateReportRequest;

        // @TODO 패스워드 해시
        const currentReport = await getReportsById(id);
        const authorization: string = context.req.headers.authorization;
        if (currentReport.password) {
            if (report.password !== currentReport.password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (authorization && authorization.split(' ')[1]) {
            if (currentReport.userId !== getUserId(authorization)) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        const now = new Date();
        const reportForm: UpdateReportForm = {
            updatedAt: now,
            ...report,
        };

        return await updateReport(id, reportForm, files);
    },
    deleteReport: async (_: any, deleteReportRequest: any, context: any) => {
        const { id, password } = deleteReportRequest;
        const report: RawReport = await getReportsById(id);

        if (report === undefined) {
            throw new ApolloError('Wrong Id', 'BAD_USER_INPUT');
        }

        // @TODO 패스워드 해시로 만들기.
        const authorization: string = context.req.headers.authorization;
        if (report.password) {
            if (report.password !== password) {
                throw new ApolloError('Invaild Password', 'UNAUTHENTICATED');
            }
        } else if (authorization && authorization.split(' ')[1]) {
            if (report.userId != getUserId(authorization)) {
                throw new ApolloError('Invaild AccessToken', 'UNAUTHENTICATED');
            }
        } else {
            throw new ApolloError('Not Found AccessToken', 'UNAUTHENTICATED');
        }

        return await deleteReport(id);
    },
};

export default reportMutations;
