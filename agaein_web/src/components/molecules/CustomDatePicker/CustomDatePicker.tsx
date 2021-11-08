import { getDay, getMonth, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import './CustomDatePicker.css';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/solid';
import { DatePickerTitle, LeftNavigationIcon, RightNavigationIcon } from './CustomDatePicker.style';

const DatePickerWrapper = styled.div`
    position: relative;
    width: 320px;
    padding: 9px 14px 9px 40px;
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.light.DarkGrey1};
    border-radius: 4px;

    svg {
        position: absolute;
        top: 9px;
        left: 16px;
        width: 24px;
        color: ${(props) => props.theme.light.DarkGrey1};
    }
`;

interface DatePickerProps {
    onChange: (value: Date) => void;
}

const CustomDatePicker = ({ onChange }: DatePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [nowMonth, setNowMonth] = useState<number>();

    registerLocale('ko', ko);

    const filterDay = (date: Date) => {
        const day = getMonth(date);
        return day === nowMonth;
    };

    function datePickerHandler(date: Date) {
        setStartDate(date);
        onChange(date);
    }

    return (
        <DatePickerWrapper>
            <CalendarIcon />
            <DatePicker
                locale={ko}
                dateFormat="yyyy/MM/dd"
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
                onChange={(date: Date) => datePickerHandler(date)}
                disabledKeyboardNavigation
                filterDate={filterDay}
                placeholderText="날짜를 선택해주세요"
            />
        </DatePickerWrapper>
    );
};

export default CustomDatePicker;
