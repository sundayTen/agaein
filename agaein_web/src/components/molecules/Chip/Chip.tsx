import { ChipContainer } from './Chip.style';

interface ChipProps {
    label: string;
}

const Chip = (props: ChipProps) => {
    const { label } = props;
    return <ChipContainer>{label}</ChipContainer>;
};

export default Chip;
