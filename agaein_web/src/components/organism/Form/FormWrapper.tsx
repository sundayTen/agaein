import { Wrapper, FormTitle, RequiredGuide, RequiredIcon } from './Form.style';

interface FormWrapperProps {
    formTitle: string;
    children: React.ReactNode;
}

export const FormWrapper = ({ formTitle, children }: FormWrapperProps) => {
    return (
        <Wrapper>
            <FormTitle>
                {formTitle}
                <RequiredGuide>
                    <RequiredIcon />는 필수 입력 사항입니다.
                </RequiredGuide>
            </FormTitle>
            {children}
        </Wrapper>
    );
};
