import { useState } from 'react';
import { FormRow, FormLabel, Form } from './Form.style';
import Textarea from 'components/molecules/Textarea';

interface FormTextareaProps {
    name: string;
    onChange: (value: string, name: string) => void;
    placeholder: string;
}

export function FormTextarea({ name, onChange, placeholder }: FormTextareaProps) {
    const [value, setValue] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setValue(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>내용</FormLabel>
            <Form>
                <Textarea placeholder={placeholder} value={value} onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
