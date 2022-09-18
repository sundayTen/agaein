//@ts-nocheck
import { Finding_Status } from 'graphql/generated/generated';
import { ChipContainer } from './Chip.style';

interface ChipProps {
    status: Finding_Status;
}

const Chip = (props: ChipProps) => {
    const { status } = props;
    return <ChipContainer isDone={status === '완료'}>{status}</ChipContainer>;
};

export default Chip;
