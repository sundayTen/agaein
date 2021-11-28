import { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from './Form.style';
import Input from 'components/molecules/Input';

interface FormInputProps {
    name: string;
    onChange: (value: string, name: string) => void;
    label: string;
    placeholder: string;
    required?: boolean;
}

export function FormInput({ name, onChange, label, placeholder, required }: FormInputProps) {
    const [value, setValue] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>
                {label}
                {required && <RequiredIcon />}
            </FormLabel>
            <Form>
                <Input type="text" placeholder={placeholder} value={value} onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
