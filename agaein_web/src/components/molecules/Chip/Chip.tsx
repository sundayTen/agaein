import React from 'react';
import Font from '../Font';
import { ChipContainer } from './Chip.style';

interface ChipProps {
    label: string;
}

const Chip = (props: ChipProps) => {
    const { label } = props;
    return (
        <ChipContainer>
            <Font label={label} fontType="tag" fontWeight="normal" htmlElement="span" style={{ color: 'white' }} />
        </ChipContainer>
    );
};

export default Chip;
