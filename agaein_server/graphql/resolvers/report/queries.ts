import { QueryReportsArgs } from '../../types';
import { getReportsByArticleId } from './services';

const reportQueries = {
    reports: async (_: any, reportRequest: QueryReportsArgs) => getReportsByArticleId(reportRequest.articleId),
};

export default reportQueries;
