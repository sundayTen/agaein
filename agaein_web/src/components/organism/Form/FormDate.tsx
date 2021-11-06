import React, { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';

import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getYear } from 'date-fns';
import ko from 'date-fns/esm/locale/ko';
import CustomDatePicker from 'components/molecules/CustomDatePicker/CustomDatePicker';

interface FormDateProps {
    name: string;
    type: string;
    onChange?: (value: any, name: string) => void;
}

export function FormDate({ name, type, onChange }: FormDateProps) {
    const LableType = type === 'LFP' ? '실종' : '발견';

    function inputChangeHandler(value: Date) {
        onChange?.(value, name);
    }

    return (
        <FormRow>
            <FormLabel>
                {LableType}일
                <RequiredIcon />
            </FormLabel>
            <Form>
                <CustomDatePicker onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
