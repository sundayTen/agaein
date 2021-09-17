import { StyledButton } from './Button.style';

interface ButtonProps {
    color: string;
    label: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { label, onClick, color } = props;
    return (
        <StyledButton onClick={onClick} color={color}>
            {label}
        </StyledButton>
    );
};

export default Button;
