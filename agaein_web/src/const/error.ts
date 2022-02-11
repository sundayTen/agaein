import { ERROR_TYPE } from './types';

const ERROR_MESSAGES: ERROR_TYPE = {
    GLOBAL: {
        AUTHENTICATION: '로그인 정보를 확인해주세요',
        NOT_FOUND: '페이지를 찾을 수 없습니다',
        TIME_OUT: '응답시간이 초과되었습니다',
        PERMISSION: '접근할 수 없는 페이지입니다',
    },
    ARTICLE: {
        WRONG_PASSWORD: '잘못된 패스워드입니다.',
        DELETED_ARTICLE: '삭제된 게시글입니다',
    },
    COMMENT: {
        WRONG_PASSWORD: '잘못된 패스워드입니다.',
        DELETED_COMMENT: '삭제된 댓글입니다',
    },
};

export default ERROR_MESSAGES;
