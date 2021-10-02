import styled, { css } from 'styled-components';

interface StyledButtonProps {
    buttonType: 'NORMAL' | 'BIG' | 'SMALL';
    status: 'PAINTED' | 'BORDER' | 'DISABLED';
}

const sizeStyles = css`
    ${(props: StyledButtonProps) =>
        props.buttonType === 'BIG' &&
        css`
            width: 149px;
            height: 64px;
            font-size: 20px;
        `}

    ${(props) =>
        props.buttonType === 'NORMAL' &&
        css`
            width: 102px;
            height: 40px;
            font-size: 16px;
        `}

    ${(props) =>
        props.buttonType === 'SMALL' &&
        css`
            width: 82px;
            height: 32px;
            font-size: 14px;
        `}
`;

const colorStyles = css`
    ${(props: StyledButtonProps) =>
        props.status === 'PAINTED' &&
        css`
            background-color: props.theme.light.primary;
            color: 'white';
        `}

    ${(props) =>
        props.status === 'BORDER' &&
        css`
            border: '1px solid' + props.theme.light.primary
            background-color: 'white';
            color: props.theme.light.primary;
        `}

    ${(props) =>
        props.status === 'DISABLED' &&
        css`
            background-color: ? props.theme.light.disable;
            color: 'white';
            cursor: default;
        `}
`;

export const StyledButton = styled.button<StyledButtonProps>`
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    user-select: none;

    ${sizeStyles}

    ${colorStyles}
`;
