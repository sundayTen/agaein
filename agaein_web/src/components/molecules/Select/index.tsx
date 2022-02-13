//@ts-nocheck
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

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

const Select = ({ options, children, optionsAbsoluteTop, optionsMinWidth }: SelectProps) => {
    const [isShowSelectList, setIsShowSelectList] = useState<boolean>(false);

    function clickSelect() {
        setIsShowSelectList(!isShowSelectList);
    }
    return (
        <>
            <span onClick={() => clickSelect()}>{children}</span>
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
