//@ts-nocheck
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDownIcon } from '@heroicons/react/solid';

const StyledSelect = styled.div`
    position: relative;
    width: 220px;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    background: ${(props) => props.theme.light.white};
    border: 1px solid;
    border-color: ${(props) => props.theme.light.DarkGrey1};
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 16px;
    color: ${(props) => props.theme.light.black};
    cursor: pointer;

    ${(props) =>
        props.selected &&
        css`
            border-color: ${(props) => props.theme.light.primary};
        `}

    &:hover {
        border-color: ${(props) => props.theme.light.primary};
    }
`;

const SelectIcon = styled.i`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;

    svg {
        width: 20px;
    }

    ${(props) =>
        props.selected &&
        css`
            transform: rotate(180deg);
            color: ${(props) => props.theme.light.primary};
        `}
`;

const SelectList = styled.ul`
    position: absolute;
    top: 46px;
    left: 0;
    box-sizing: border-box;
    min-width: 220px;
    padding: 6px;
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.12);
    border-radius: 6px;
    background-color: ${(props) => props.theme.light.white};
    z-index: 1000;
`;

const SelectItem = styled.li`
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        color: ${(props) => props.theme.light.primary};
        background-color: ${(props) => props.theme.light.background};
    }
`;

interface SelectProps {
    name: string;
    defaultValue: string;
    onChange: () => void;
    options: string[];
}

const Select = ({ name, defaultValue, onChange, options }: SelectProps) => {
    const [isShowSelectList, setIsShowSelectList] = useState<boolean>(false);

    function clickSelect() {
        setIsShowSelectList(!isShowSelectList);
    }

    function clickSelectItem(id) {
        onChange(id);
        setIsShowSelectList(!isShowSelectList);
    }

    return (
        <>
            <StyledSelect selected={isShowSelectList} onClick={() => clickSelect()}>
                {defaultValue}
                <SelectIcon selected={isShowSelectList}>
                    <ChevronDownIcon />
                </SelectIcon>
            </StyledSelect>
            {isShowSelectList && (
                <SelectList>
                    {options.map((option) => {
                        return (
                            <SelectItem key={option.id} onClick={() => clickSelectItem(option.id)}>
                                {option.name || option.breed}
                            </SelectItem>
                        );
                    })}
                </SelectList>
            )}
        </>
    );
};

export default Select;
