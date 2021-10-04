import styled, { css } from 'styled-components';

interface StyledButtonProps {
    size: 'LARGE' | 'MEDIUM' | 'SMALL';
    buttonStyle: 'PAINTED' | 'BORDER';
}

const sizeStyles = css`
    ${(props: StyledButtonProps) =>
        props.size === 'LARGE' &&
        css`
            width: 149px;
            height: 64px;
            font-size: 20px;
        `}

    ${(props) =>
        props.size === 'MEDIUM' &&
        css`
            width: 102px;
            height: 40px;
            font-size: 16px;
        `}

    ${(props) =>
        props.size === 'SMALL' &&
        css`
            width: 82px;
            height: 32px;
            font-size: 14px;
        `}
`;

const colorStyles = css`
    ${(props: StyledButtonProps) =>
        props.buttonStyle === 'PAINTED' &&
        css`
            background-color: ${(props) => props.theme.light.primary};
            color: white;
        `}

    ${(props) =>
        props.buttonStyle === 'BORDER' &&
        css`
            border: 1px solid ${(props) => props.theme.light.primary};
            background-color: white;
            color: ${(props) => props.theme.light.primary}; ;
        `}
`;

const hoverStyle = css``;

export const StyledButton = styled.button<StyledButtonProps>`
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    user-select: none;

    ${sizeStyles}

    ${colorStyles}

    &:hover {
        background-color: #f1ad58;
    }

    &:active {
        background-color: '#DA9237';
    }

    &:disabled {
        background-color: '#F8D6AB';
        cursor: default;
    }
`;
