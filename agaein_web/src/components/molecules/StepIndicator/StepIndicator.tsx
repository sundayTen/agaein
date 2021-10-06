import Font from '../Font';
import Circle, { StepStatus } from './Circle/Circle';
import { Edge, FontContainer, StepIndicatorContainer } from './StepIndicator.style';

interface StepIndicatorProps {
    active: number;
    styles?: React.CSSProperties;
}

export const StepIndicator = (props: StepIndicatorProps) => {
    const getStatus = (index: number): StepStatus => {
        // ? index : 내 상태 active : 현재 상태
        if (active === index) {
            return 'ACTIVE';
        }
        if (index < active) {
            return 'DONE';
        }
        return 'YET';
    };
    const { active, styles } = props;
    return (
        <>
            <StepIndicatorContainer style={styles}>
                <Circle status={getStatus(1)} index={1} />
                <Edge status={getStatus(1)} />
                <Circle status={getStatus(2)} index={2} />
                <Edge status={getStatus(2)} />
                <Circle status={getStatus(3)} index={3} />
            </StepIndicatorContainer>
            <FontContainer>
                <Font label="분류 선택" fontType="tag" />
                <Font label="게시글 작성" fontType="tag" />
                <Font label="작성 완료" fontType="tag" />
            </FontContainer>
        </>
    );
};

export default StepIndicator;
