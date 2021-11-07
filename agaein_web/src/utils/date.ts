import moment from 'moment';

/**
 *
 * @param day1 moment객체의 .get메소드의 리턴타입이 unixTimestamp라 number type
 * @param day2 moment객체의 .get메소드의 리턴타입이 unixTimestamp라 number type
 * @returns boolean
 */
const isSameDay = (day1: number, day2: number): boolean => {
    return day1 === day2;
};
const isSameMonth = (month1: number, month2: number): boolean => {
    return month1 === month2;
};
const isSameYear = (year1: number, year2: number): boolean => {
    return year1 === year2;
};

/**
 * 오늘 작성된 글 : 시간만 표기
 * 올해지만 오늘은 아님 : 월, 일만 표기
 * 올해가 아님 : 연, 월, 일 표기
 * @param {string} date\
 */
const convertDate = (date: string): string => {
    const now = moment(new Date());
    const targetDate = moment(date);

    if (isSameYear(now.get('year'), targetDate.get('year'))) {
        if (isSameMonth(now.get('month'), targetDate.get('month'))) {
            if (isSameDay(now.get('date'), targetDate.get('date'))) {
                return targetDate.format('HH시 mm분');
            }
        }
        return targetDate.format('MM월 DD일');
    }
    return targetDate.format('YY년 MM월 DD일');
};

const YYYYMMDD = (date: string) => {
    return moment(date).format('YYYY년 MM월 DD일');
};

export { convertDate, YYYYMMDD };
