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

interface FormCheckboxProps {
    name: string;
    label: string;
    value: boolean;
    onChange: (value: any, name: string) => {};
}

export function FormCheckbox({ name, label, value, onChange }: FormCheckboxProps) {
    const inputChangeHandler = (value: any) => {
        onChange(value, name);
    };

    return (
        <Wrapper>
            <Checkbox checked={value} onChange={(e) => inputChangeHandler(e.target.checked)} />
            <Label>{label}</Label>
        </Wrapper>
    );
}
