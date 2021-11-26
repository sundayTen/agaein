import Button from 'components/molecules/Button';
import styled, { css } from 'styled-components';
interface ToggleButtonProps {
    click: boolean;
}

export const ToggleButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const WitnessDetailDiv = styled.div`
    display: flex;
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
    width: 120px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.light.DarkGrey1};
    margin-bottom: 10px;
    border-radius: 4px 0px 0px 4px;
    background: ${(props) => props.theme.light.white};
    color: #505050;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;

    ${(props) =>
        props.click &&
        css`
            border-color: ${(props) => props.theme.light.primary};
            background-color: rgba(239, 160, 61, 0.1);
            color: ${(props) => props.theme.light.primary};

            & + & {
                border-left-color: ${(props) => props.theme.light.primary};
            }
        `}

    & + & {
        border-radius: 0px 4px 4px 0px;
        margin-left: -1px;
    }
`;
