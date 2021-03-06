import { useEffect, useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from './Form.style';
import Input from 'components/molecules/Input';

interface FormPasswordProps {
    name: string;
    onChange: (value: string | undefined, name: string) => void;
}

export function FormPassword({ name, onChange }: FormPasswordProps) {
    const [password, setPassword] = useState({
        password1: '',
        password2: '',
    });

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (password.password1 !== password.password2 && password.password2 !== '') {
            setIsError(true);
            onChange(undefined, name);
            return;
        }

        setIsError(false);

        if (password.password1.length === 4 && password.password1 === password.password2) {
            onChange(password.password1, name);
        }
    }, [password]);

    function inputChangeHandler(value: string, type: string) {
        setPassword((prev) => ({ ...prev, [type]: value }));
    }

    return (
        <>
            <FormRow>
                <FormLabel>
                    비밀번호
                    <RequiredIcon />
                </FormLabel>
                <Form>
                    <Input
                        type="password"
                        placeholder="비밀번호 4자리를 입력해주세요"
                        maxLength={4}
                        value={password.password1}
                        onChange={(e) => inputChangeHandler(e.target.value, 'password1')}
                        autoComplete="new-password"
                    />
                </Form>
            </FormRow>
            <FormRow>
                <FormLabel>
                    비밀번호 확인
                    <RequiredIcon />
                </FormLabel>
                <Form>
                    <Input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        maxLength={4}
                        value={password.password2}
                        onChange={(e) => inputChangeHandler(e.target.value, 'password2')}
                        isError={isError}
                        ErrorMessage={'비밀번호가 같지 않습니다.'}
                        autoComplete="new-password"
                    />
                </Form>
            </FormRow>
        </>
    );
}
