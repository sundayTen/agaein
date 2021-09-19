import { StyledButton } from './Button.style';

interface ButtonProps {
    label: string;
    color?: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { label, color, onClick } = props;
    return (
        <StyledButton onClick={onClick} color={color}>
            {label}
        </StyledButton>
    );
};

export default Button;
