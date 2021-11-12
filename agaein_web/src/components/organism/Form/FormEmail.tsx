import { useState } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import Input from 'components/molecules/Input';

interface FormEmailProps {
    name: string;
    onChange: (value: string, name: string) => void;
}

export function FormEmail({ name, onChange }: FormEmailProps) {
    const [value, setValue] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>이메일</FormLabel>
            <Form>
                <Input type="email" placeholder="이메일을 입력해주세요" value={value} onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
