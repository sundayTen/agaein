import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import Input from 'components/molecules/Input';

interface FormEmailProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
}

export function FormEmail({ name, value, onChange }: FormEmailProps) {
    function inputChangeHandler(value: string) {
        onChange?.(value, name);
    }

    return (
        <FormRow>
            <FormLabel>이메일</FormLabel>
            <Form>
                <Input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={value}
                    onChange={(e) => inputChangeHandler(e.target.value)}
                />
            </Form>
        </FormRow>
    );
}
