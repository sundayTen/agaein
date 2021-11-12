import { useState } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import Input from 'components/molecules/Input';

interface FormNameProps {
    name: string;
    onChange: (value: string, name: string) => void;
}

export function FormName({ name, onChange }: FormNameProps) {
    const [value, setValue] = useState('');

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value);
        onChange(value, name);
    }

    return (
        <FormRow>
            <FormLabel>이름</FormLabel>
            <Form>
                <Input type="text" placeholder="동물 이름을 입력해주세요" value={value} onChange={inputChangeHandler} />
            </Form>
        </FormRow>
    );
}
