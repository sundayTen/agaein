interface GLOBAL_ERROR {
    AUTHENTICATION: string;
    NOT_FOUND: string;
    TIME_OUT: string;
    PERMISSION: string;
}
interface ARTICLE_ERROR {
    WRONG_PASSWORD: string;
    DELETED_ARTICLE: string;
}
interface COMMENT_ERROR {
    WRONG_PASSWORD: string;
    DELETED_COMMENT: string;
}
interface ERROR_TYPE {
    GLOBAL: GLOBAL_ERROR;
    ARTICLE: ARTICLE_ERROR;
    COMMENT: COMMENT_ERROR;
}

export type { GLOBAL_ERROR, ARTICLE_ERROR, COMMENT_ERROR, ERROR_TYPE };
