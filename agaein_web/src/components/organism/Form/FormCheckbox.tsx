import { useState } from 'react';
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

interface FormCheckdboxProps {
    name: string;
    label: string;
    onChange: (value: any, name: string) => void;
}

export function FormCheckbox({ name, label, onChange }: FormCheckdboxProps) {
    const [value, setValue] = useState<boolean>(false);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setValue(value);
        onChange(value, name);
    };

    return (
        <Wrapper>
            <Checkbox checked={value} onChange={inputChangeHandler} />
            <Label>{label}</Label>
        </Wrapper>
    );
}
