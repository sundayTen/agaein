import styled from 'styled-components';
import { StepStatus } from './Circle/Circle';

export const StepIndicatorContainer = styled.div`
    width: 396px;
    display: flex;
    flex-direction: horizontal;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`;

export const FontContainer = styled.div`
    width: 410px;
    display: flex;
    flex-direction: horizontal;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding-top: 10px;
`;

export const Edge = styled.div<{ status: StepStatus }>`
    width: 170px;
    height: 2px;
    background-color: ${(props) => props.theme.light.primary};
    opacity: ${(props) => (props.status === 'DONE' ? 1 : 0.5)};
`;
