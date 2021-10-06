import { CheckIcon } from '@heroicons/react/solid';
import { CircleContainer, StepFont } from './Circle.style';

export type StepStatus = 'DONE' | 'YET' | 'ACTIVE';
interface CircleProps {
    status: StepStatus;
    index: number;
}

const Circle = (props: CircleProps) => {
    const { status, index } = props;
    return (
        <CircleContainer status={status}>
            {status === 'DONE' ? <CheckIcon style={{ width: 15, height: 15 }} /> : <StepFont>{index}</StepFont>}
        </CircleContainer>
    );
};
export default Circle;
