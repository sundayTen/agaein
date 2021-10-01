import { StyledButton } from './Button.style';

interface ButtonProps {
    label: string;
    status?: 'PAINTED' | 'BORDER' | 'DISABLED';
    type?: 'NORMAL' | 'BIG' | 'SMALL';
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { label, status = 'BORDER', type = 'NORMAL', onClick } = props;
    return (
        <StyledButton disabled={status === 'DISABLED'} buttonType={type} status={status} onClick={onClick}>
            {label}
        </StyledButton>
    );
};

export default Button;
