import { useState } from 'react';
import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import Textarea from 'components/molecules/Textarea';

interface FormNameProps {
    name: string;
    onChange: (value: string, name: string) => void;
    type?: string;
}

export function FormEtc({ name, onChange, type }: FormNameProps) {
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
                <Textarea
                    placeholder={
                        type === 'LFG_M' ? '그 외 특징 및 상세 위치를 작성해주세요' : '그 외 특징을 작성해주세요'
                    }
                    value={value}
                    onChange={inputChangeHandler}
                />
            </Form>
        </FormRow>
    );
}
