import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { SelectIcon, SelectItem, SelectList, StyledSelect } from './Select.style';

interface SelectProps {
    name: string;
    onChange: (name: string, option: string) => void;
    options: string[];
}

const Select = ({ name, onChange, options }: SelectProps) => {
    const [isShowSelectList, setIsShowSelectList] = useState<boolean>(false);

    function clickSelect() {
        setIsShowSelectList(!isShowSelectList);
    }

    function clickSelectItem(name: string, option: string) {
        onChange(name, option);
        setIsShowSelectList(!isShowSelectList);
    }

    return (
        <Fragment>
            <StyledSelect selected={isShowSelectList} onClick={() => clickSelect()}>
                {options[0]}
                <SelectIcon selected={isShowSelectList}>
                    <ChevronDownIcon />
                </SelectIcon>
            </StyledSelect>
            {isShowSelectList && (
                <SelectList>
                    {options.map((option) => {
                        return (
                            <SelectItem key={option} onClick={() => clickSelectItem(name, option)}>
                                {option}
                            </SelectItem>
                        );
                    })}
                </SelectList>
            )}
        </Fragment>
    );
};

export default Select;
