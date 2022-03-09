import styled, { css } from 'styled-components';

interface StyledButtonProps {
    size: 'LARGE' | 'MEDIUM' | 'SMALL' | 'XLARGE';
    buttonStyle: 'PAINTED' | 'BORDER' | 'BLACK';
}

const sizeStyles = css`
    ${(props: StyledButtonProps) =>
        props.size === 'XLARGE' &&
        css`
            min-width: 140px;
            height: 58px;
            font-size: 20px;
        `}

    ${(props) =>
        props.size === 'LARGE' &&
        css`
            min-width: 120px;
            height: 52px;
            font-size: 18px;
        `}

    ${(props) =>
        props.size === 'MEDIUM' &&
        css`
            min-width: 100px;
            height: 40px;
            font-size: 16px;
        `}

    ${(props) =>
        props.size === 'SMALL' &&
        css`
            min-width: 80px;
            height: 32px;
            font-size: 14px;
        `}
`;

const colorStyles = css`
    ${(props: StyledButtonProps) =>
        props.buttonStyle === 'PAINTED' &&
        css`
            background-color: ${(props) => props.theme.light.primary};
            color: ${(props) => props.theme.light.white};

            &:hover {
                background-color: ${(props) => props.theme.light.primary800};
            }

            &:disabled {
                border: 0;
                background-color: ${(props) => props.theme.light.primary100};
                color: ${(props) => props.theme.light.white};
                cursor: default;
            }
        `}

    ${(props) =>
        props.buttonStyle === 'BORDER' &&
        css`
            border: 1px solid ${(props) => props.theme.light.primary};
            background-color: transparent;
            color: ${(props) => props.theme.light.primary};

            &:hover {
                background-color: ${(props) => props.theme.light.primary800};
                color: ${(props) => props.theme.light.white};
                border: 1px solid ${(props) => props.theme.light.primary800};
            }

            &:disabled {
                background-color: transparent;
                border-color: ${(props) => props.theme.light.primary100};
                color: ${(props) => props.theme.light.primary100};
                cursor: default;
            }
        `}

    ${(props) =>
        props.buttonStyle === 'BLACK' &&
        css`
            background-color: ${(props) => props.theme.light.DarkGrey2};
            color: ${(props) => props.theme.light.white};

            &:hover {
                background-color: ${(props) => props.theme.light.black};
            }

            &:disabled {
                background-color: ${(props) => props.theme.light.lightGrey2};
                cursor: default;
            }
        `}
`;

export const StyledButton = styled.button<StyledButtonProps>`
    padding: 0 10px;
    border-radius: 4px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    user-select: none;

    ${sizeStyles}
    ${colorStyles}
`;
