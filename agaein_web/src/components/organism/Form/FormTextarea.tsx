import { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from './Form.style';
import Textarea from 'components/molecules/Textarea';

interface FormTextareaProps {
    name: string;
    onChange: (value: string, name: string) => void;
    placeholder: string;
    required?: boolean;
}

export function FormTextarea({ name, onChange, placeholder, required }: FormTextareaProps) {
    const [value, setValue] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setValue(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>
                내용
                {required && <RequiredIcon />}
            </FormLabel>
            <Form>
                <Textarea placeholder={placeholder} value={value} onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
