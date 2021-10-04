import React, { useState } from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = styled.div`
    flex: 1;
`;

interface FormDateProps {}

export function FormDate(props: FormDateProps) {
    const [startDate, setStartDate] = useState<Date>(new Date());

    return (
        <FormRow>
            <FormLabel>실종일*</FormLabel>
            <Form>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </Form>
        </FormRow>
    );
}
