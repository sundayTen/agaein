import { FormRow, FormLabel, Form } from '../../pages/createArticle/CreateArticle.style';
import Input from 'components/molecules/Input';

interface FormNameProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
}

export function FormName({ name, value, onChange }: FormNameProps) {
    function inputChangeHandler(value: string) {
        onChange?.(value, name);
    }

    return (
        <FormRow>
            <FormLabel>이름</FormLabel>
            <Form>
                <Input
                    type="text"
                    placeholder="동물 이름을 입력해주세요"
                    value={value}
                    onChange={(e) => inputChangeHandler(e.target.value)}
                />
            </Form>
        </FormRow>
    );
}
