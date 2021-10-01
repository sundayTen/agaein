import Circle from './Circle/Circle';
import { Edge, StepIndicatorContainer } from './StepIndicator.style';

interface StepIndicatorProps {
    active: number;
    styles?: React.CSSProperties;
}

export const StepIndicator = (props: StepIndicatorProps) => {
    const { active, styles } = props;
    return (
        <StepIndicatorContainer style={styles}>
            <Circle active={1 === active} index={1} />
            <Edge />
            <Circle active={2 === active} index={2} />
            <Edge />
            <Circle active={3 === active} index={3} />
        </StepIndicatorContainer>
    );
};

export default StepIndicator;
