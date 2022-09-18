import dayjs from 'dayjs';

const MICROSECOND_UNIT = 1000;
const MINUIT_TO_SECOND = 60;
const HOUR_TO_MINUTE = 60;
const DAY_TO_HOUR = 24;

// * Second 단위로 변환
const DAY = DAY_TO_HOUR * HOUR_TO_MINUTE * MINUIT_TO_SECOND;
const HOUR = HOUR_TO_MINUTE * MINUIT_TO_SECOND;
const MINUIT = MINUIT_TO_SECOND;

/**
 * YYYY년 MM월 DD일 포맷으로 변환해주는 함수
 * @param {string} date Date 객체 string
 * @returns {string } YYYY년 MM월 DD일
 */
const YYYYMMDD = (date: string): string => {
    return dayjs(date).format('YYYY년 MM월 DD일');
};

const YYYY_MM_DD = (date: string): string => {
    return dayjs(date).format('YYYY-MM-DD');
};

/**
 * unix timestamp의 microsecond를 없애줍니다.
 * @param {number} time unixTimestamp
 * @returns {number} unixTimestamp
 */
const dropFloat = (time: number) => {
    return Math.floor(time / MICROSECOND_UNIT);
};

/**
 * 오늘을 기점으로 시간을 다르게 표기하는 함수
 * @param date string
 * @returns {string} **초 전 | **분 전 | **시간 전 | YYYY년 MM월 DD일
 */
const formattedDate = (date: string) => {
    const today = new Date().getTime();
    const targetDate = new Date(date).getTime();
    const diff = dropFloat(today) - dropFloat(targetDate);

    if (diff >= DAY) {
        return YYYYMMDD(date);
    }
    if (diff >= HOUR) {
        return `${Math.floor(diff / HOUR)}시간 전`;
    }
    if (diff >= MINUIT) {
        return `${Math.floor(diff / MINUIT)}분 전`;
    }
    return `${Math.floor(diff)}초 전`;
};

export { YYYYMMDD, YYYY_MM_DD, formattedDate };
