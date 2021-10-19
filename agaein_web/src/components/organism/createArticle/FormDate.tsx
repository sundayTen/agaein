import React, { useState } from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getYear } from 'date-fns';
import ko from 'date-fns/esm/locale/ko';
import CustomDatePicker from 'components/molecules/CustomDatePicker/CustomDatePicker';

const Form = styled.div`
    flex: 1;
`;
const testContainer = styled(CalendarContainer)`
    background: #ffffff;
`;
interface FormDateProps {}

export function FormDate(props: FormDateProps) {
    return (
        <FormRow>
            <FormLabel>실종일*</FormLabel>
            <Form>
                <CustomDatePicker />
            </Form>
        </FormRow>
    );
}
