import styled from 'styled-components';
import { StepStatus } from './Circle/Circle';

export const StepIndicatorContainer = styled.div`
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

export const FontContainer = styled.div`
    width: 450px;
    display: flex;
    flex-direction: horizontal;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding-top: 16px;
`;

export const Edge = styled.div<{ status: StepStatus }>`
    width: 170px;
    height: 2px;
    background-color: ${(props) => props.theme.light.primary};
    opacity: ${(props) => (props.status === 'DONE' ? 1 : 0.5)};
`;
