import styled from 'styled-components';

interface StyledButtonProps {
    buttonType?: 'NORMAL' | 'BIG' | 'SMALL';
    status?: 'PAINTED' | 'BORDER' | 'DISABLED';
}

export const StyledButton = styled.button<StyledButtonProps>`
    padding: 5px 10px;
    border-radius: 29px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    user-select: none;
    width: ${(props) => (props.buttonType === 'BIG' ? '400px' : props.buttonType === 'SMALL' ? '140px' : '200px')};
    height: ${(props) => (props.buttonType === 'BIG' ? '180px' : props.buttonType === 'SMALL' ? '40px' : '52px')};
    border: ${(props) => (props.status === 'BORDER' ? '1px solid' + props.theme.light.primary : undefined)};
    background-color: ${(props) =>
        props.status === 'PAINTED'
            ? props.theme.light.primary
            : props.status === 'DISABLED'
            ? props.theme.light.disable
            : 'white'};
    color: ${(props) => (props.status === 'BORDER' ? props.theme.light.primary : 'white')};
`;
