import { getDay, getMonth, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import './CustomDatePicker.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { DatePickerTitle, LeftNavigationIcon, RightNavigationIcon } from './CustomDatePicker.style';
const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [nowMonth, setNowMonth] = useState<number>();
    const filterDay = (date: Date) => {
        const day = getMonth(date);
        return day === nowMonth;
    };
    registerLocale('ko', ko);

    return (
        <DatePicker
            locale={ko}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
                setNowMonth(getMonth(date));
                return (
                    <div>
                        <button
                            aria-label="Previous Month"
                            className={'react-datepicker__navigation react-datepicker__navigation--previous'}
                            onClick={decreaseMonth}
                        >
                            <LeftNavigationIcon />
                        </button>
                        <DatePickerTitle className="react-datepicker__current-month">
                            {getYear(date)}년 {getMonth(date) + 1}월
                        </DatePickerTitle>
                        <button
                            aria-label="Next Month"
                            className={'react-datepicker__navigation react-datepicker__navigation--next'}
                            onClick={increaseMonth}
                        >
                            <RightNavigationIcon />
                        </button>
                    </div>
                );
            }}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            disabledKeyboardNavigation
            filterDate={filterDay}
        />
    );
};

export default CustomDatePicker;
