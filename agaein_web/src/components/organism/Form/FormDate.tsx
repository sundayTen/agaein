import React, { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getYear } from 'date-fns';
import ko from 'date-fns/esm/locale/ko';
import CustomDatePicker from 'components/molecules/CustomDatePicker/CustomDatePicker';

interface FormDateProps {}

export function FormDate(props: FormDateProps) {
    return (
        <FormRow>
            <FormLabel>
                실종일
                <RequiredIcon />
            </FormLabel>
            <Form>
                <CustomDatePicker />
            </Form>
        </FormRow>
    );
}
