import { CircleContainer } from './Circle.style';

interface CircleProps {
    active: boolean;
    index: number;
}

const Circle = (props: CircleProps) => {
    const { active, index } = props;
    return <CircleContainer active={active}>{index}</CircleContainer>;
};
export default Circle;
