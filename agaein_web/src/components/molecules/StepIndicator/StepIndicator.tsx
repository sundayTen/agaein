import Font from '../Font';
import { FontStatus } from '../Font/Font';
import Circle, { StepStatus } from './Circle/Circle';
import { Edge, FontContainer, StepIndicatorContainer } from './StepIndicator.style';

interface StepIndicatorProps {
    active: number;
    styles?: React.CSSProperties;
}

export const StepIndicator = (props: StepIndicatorProps) => {
    const { active, styles } = props;
    const getStatus = (index: number): StepStatus => {
        if (active === index) {
            return 'ACTIVE';
        }
        if (index < active) {
            return 'DONE';
        }
        return 'YET';
    };

    const getFontStatus = (index: number): FontStatus => {
        if (getStatus(index) === 'YET') {
            return 'DISABLED';
        }
        return 'ACTIVE';
    };
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
                <Font label="분류 선택" fontType="tag" status={getFontStatus(1)} />
                <Font label="게시글 작성" fontType="tag" status={getFontStatus(2)} />
                <Font label="작성 완료" fontType="tag" status={getFontStatus(3)} />
            </FontContainer>
        </>
    );
};

export default StepIndicator;
