interface GLOBAL_ERROR {
    AUTHENTICATION: string;
}
interface ARTICLE_ERROR {
    'Wrong password': string;
}
interface COMMENT_ERROR {
    'Wrong password': string;
}
interface ERROR_TYPE {
    GLOBAL: GLOBAL_ERROR;
    ARTICLE: ARTICLE_ERROR;
    COMMENT: COMMENT_ERROR;
}

export type { GLOBAL_ERROR, ARTICLE_ERROR, COMMENT_ERROR, ERROR_TYPE };
