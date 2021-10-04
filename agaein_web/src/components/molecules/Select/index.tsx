import React, { useState } from 'react';
import styled from 'styled-components';

interface SelectProps {}

const StyledSelect = styled.div`
    width: 140px;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    background: #fff;
    border: 1px solid #bfc4ca;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        top: 16px;
        right: 16px;
        height: 8px;
        border: solid #bfc4ca;
        border-width: 8px 6px;
        border-color: #bfc4ca transparent transparent;
    }
`;

const SelectList = styled.ul`
    position: absolute;
    top: 45px;
    left: 0;
    box-sizing: border-box;
    width: 140px;
    border: 1px solid #bfc4ca;
    border-radius: 4px;
    background-color: #fff;
    z-index: 1000;
`;

const SelectItem = styled.li`
    padding: 10px 16px;
    cursor: pointer;

    &:hover {
        color: green;
    }
`;

const Select = (props: SelectProps) => {
    const [isShowSelectList, setIsShowSelectList] = useState<boolean>(false);

    return (
        <>
            <StyledSelect onClick={() => setIsShowSelectList(!isShowSelectList)}>개</StyledSelect>
            {isShowSelectList && (
                <SelectList>
                    <SelectItem>개</SelectItem>
                    <SelectItem>고양이</SelectItem>
                    <SelectItem>기타</SelectItem>
                </SelectList>
            )}
        </>
    );
};

export default Select;
