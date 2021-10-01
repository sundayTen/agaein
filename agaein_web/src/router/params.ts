import { Board_Type } from 'graphql/generated/generated';

export interface CreateArticleStep1Params {
    id?: string;
}
export interface CreateArticleStep2Params {
    type: Board_Type;
}
export interface ArticleListParams {
    id: string;
}
