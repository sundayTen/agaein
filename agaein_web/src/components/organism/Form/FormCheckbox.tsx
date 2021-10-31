import Checkbox from 'components/molecules/Checkbox';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.p`
    margin-left: 10px;
`;

interface FormCheckboxProps {
    label: string;
}

export function FormCheckbox({ label }: FormCheckboxProps) {
    return (
        <Wrapper>
            <Checkbox />
            <Label>{label}</Label>
        </Wrapper>
    );
}
