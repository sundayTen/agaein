import Checkbox from 'components/molecules/Checkbox';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    & + & {
        margin-top: 20px;
    }
`;

const Label = styled.p`
    margin-left: 10px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    font-weight: 400;
    color: ${(props) => props.theme.light.black};
`;

const Required = styled.span`
    color: ${(props) => props.theme.light.primary};
`;

interface FormCheckboxProps {
    name: string;
    label: string;
    value: boolean;
    onChange: (value: any, name: string) => {};
    required?: boolean;
}

export function FormCheckbox({ name, label, value, onChange, required }: FormCheckboxProps) {
    const inputChangeHandler = (value: any) => {
        onChange(value, name);
    };

    return (
        <Wrapper>
            <Checkbox checked={value} onChange={(e) => inputChangeHandler(e.target.checked)} />
            <Label>
                {required && <Required>(필독)</Required>} {label}
            </Label>
        </Wrapper>
    );
}
