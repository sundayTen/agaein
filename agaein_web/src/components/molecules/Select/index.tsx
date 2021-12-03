//@ts-nocheck
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

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

const SelectList = styled.ul<{ optionsAbsoluteTop: string; optionsMinWidth: string }>`
    position: absolute;
    top: ${(props) => props.optionsAbsoluteTop};
    left: 0;
    box-sizing: border-box;
    min-width: ${(props) => props.optionsMinWidth};
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
    children: React.ReactNode;
    name: string;
    defaultValue: string;
    onChange: () => void;
    options: { id: string; name: string; onClick: () => void }[];
    optionsAbsoluteTop: string;
    optionsMinWidth: string;
}

const Select = ({
    name,
    defaultValue,
    onChange,
    options,
    children,
    optionsAbsoluteTop,
    optionsMinWidth,
}: SelectProps) => {
    const [isShowSelectList, setIsShowSelectList] = useState<boolean>(false);
    function clickSelect() {
        setIsShowSelectList(!isShowSelectList);
    }
    return (
        <>
            <span onClick={() => (isShowSelectList ? setIsShowSelectList(false) : setIsShowSelectList(true))}>
                {children}
            </span>
            {isShowSelectList && (
                <SelectList optionsAbsoluteTop={optionsAbsoluteTop} optionsMinWidth={optionsMinWidth}>
                    {options.map((option) => {
                        return (
                            <SelectItem
                                key={option.id}
                                onClick={() => {
                                    option.onClick(option.id, option.name);
                                    clickSelect();
                                }}
                            >
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
