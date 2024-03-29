import { ERROR_TYPE } from 'const/types';
import { Board_Type } from 'graphql/generated/generated';

export interface CreateArticleStep1Params {
    id?: string;
}
export interface CreateArticleStep2Params {
    type: Board_Type;
    id?: string;
}
export interface CreateArticleStep3Params {
    id: string;
}
export interface ArticleListParams {
    type: Board_Type;
}
export interface ArticleDetailParams {
    id: string;
}

export interface ErrorParams {
    code: ERROR_TYPE;
}

export interface CrawlingResultParams {
    id: string;
    keyword: string;
}

export interface ReviewParams {
    id: string;
}
