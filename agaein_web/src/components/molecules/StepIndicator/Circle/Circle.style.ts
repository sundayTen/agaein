import styled, { css } from 'styled-components';
import { StepStatus } from './Circle';

interface CircleContainerProps {
    status: StepStatus;
}

const colorStyles = css`
    ${(props: CircleContainerProps) =>
        props.status === 'YET' &&
        css`
            color: white;
            background-color: ${(props) => props.theme.light.primary};
            opacity: 0.5;
        `}

    ${(props) =>
        props.status === 'ACTIVE' &&
        css`
            border: ${(props) => '2px solid' + props.theme.light.primary};
            color: ${(props) => props.theme.light.primary};
        `}
        ${(props) =>
        props.status === 'DONE' &&
        css`
            color: white;
            background-color: ${(props) => props.theme.light.primary};
        `}
`;

export const CircleContainer = styled.div<CircleContainerProps>`
    width: 24px;
    height: 24px;
    border-radius: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    user-select: none;
    ${colorStyles}
`;

export const StepFont = styled.span`
    font-size: 12px;
    font-weight: 800;
    line-height: 14px;
`;
