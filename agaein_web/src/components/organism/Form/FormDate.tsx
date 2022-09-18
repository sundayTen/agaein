import { FormRow, FormLabel, Form, RequiredIcon } from './Form.style';
import 'react-datepicker/dist/react-datepicker.css';
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
