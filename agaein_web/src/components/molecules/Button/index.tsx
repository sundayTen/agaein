import { StyledButton } from './Button.style';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    label: string;
    buttonStyle?: 'PAINTED' | 'BORDER';
    size?: 'LARGE' | 'MEDIUM' | 'SMALL' | 'XLARGE';
    disabled?: boolean;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { label, buttonStyle = 'BORDER', size = 'MEDIUM', disabled, onClick, ...outers } = props;
    return (
        <StyledButton
            {...outers}
            type="button"
            size={size}
            buttonStyle={buttonStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </StyledButton>
    );
};

export default Button;
