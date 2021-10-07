import styled, { css } from 'styled-components';
import { FontStatus, FontType, FontWeight } from './Font';

interface FontProps {
    type: FontType;
    fontWeight: FontWeight;
    status: FontStatus;
}

const sizeStyles = css`
    ${(props: FontProps) =>
        props.type === 'h1' &&
        css`
            font-size: 42px;
            line-height: 50px;
        `}
    ${(props: FontProps) =>
        props.type === 'h2' &&
        css`
            font-size: 34px;
            line-height: 40px;
        `}
        ${(props: FontProps) =>
        props.type === 'h3' &&
        css`
            font-size: 24px;
            line-height: 28px;
        `}
        ${(props: FontProps) =>
        props.type === 'h3' &&
        css`
            font-size: 24px;
            line-height: 28px;
        `}
            ${(props: FontProps) =>
        props.type === 'h4' &&
        css`
            font-size: 20px;
            line-height: 24px;
        `}
        ${(props: FontProps) =>
        props.type === 'subhead' &&
        css`
            font-size: 14px;
            line-height: 16px;
        `}
            ${(props: FontProps) =>
        props.type === 'body' &&
        css`
            font-size: 12px;
            line-height: 18px;
        `}
        ${(props: FontProps) =>
        props.type === 'label' &&
        css`
            font-size: 16px;
            line-height: 18px;
        `}
            ${(props: FontProps) =>
        props.type === 'tag' &&
        css`
            font-size: 10px;
            line-height: 11px;
        `}
`;
const weightStyles = css`
    ${(props: FontProps) =>
        props.fontWeight === 'bold' &&
        css`
            font-weight: 700;
            font-family: Ssurround;
        `}
    ${(props: FontProps) =>
        props.fontWeight === 'normal' &&
        css`
            font-weight: 400;
            font-family: SsurroundAir;
        `}
`;

const fontStyles = css`
    ${(props: FontProps) =>
        props.fontWeight === 'bold' &&
        css`
            font-family: Ssurround;
        `}
    ${(props: FontProps) =>
        props.fontWeight === 'normal' &&
        css`
            font-family: SsurroundAir;
        `}
`;

const colorStyles = css`
    ${(props: FontProps) =>
        props.status === 'ACTIVE' &&
        css`
            color: ${(props) => props.theme.light.primary};
        `}
    ${(props: FontProps) =>
        props.status === 'NORMAL' &&
        css`
            color: 'black';
        `}
    ${(props: FontProps) =>
        props.status === 'DISABLED' &&
        css`
            color: ${(props) => props.theme.light.primary};
            opacity: 0.5;
        `}
`;

export const StyledFont = styled.span`
    ${sizeStyles}
    ${weightStyles}
    ${colorStyles}
    
    font-family: ${(props) =>
        props.type === 'label' || props.type === 'body' || props.type === 'tag' ? 'NanumSquareRound' : fontStyles}
`;
