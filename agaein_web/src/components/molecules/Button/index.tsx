import { StyledButton } from './Button.style';

interface ButtonProps {
    label: string;
    buttonStyle?: 'PAINTED' | 'BORDER';
    size?: 'LARGE' | 'MEDIUM' | 'SMALL';
    disabled?: boolean;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { label, buttonStyle = 'BORDER', size = 'MEDIUM', disabled, onClick } = props;
    return (
        <StyledButton type="button" size={size} buttonStyle={buttonStyle} onClick={onClick} disabled={disabled}>
            {label}
        </StyledButton>
    );
};

export default Button;
