import React, { useState } from 'react';
import {
    AreaInput,
    DateInput,
    KindSelect,
    SearchBarDiv,
    SearchButton,
    SearchInput,
    SearchInputIcon,
} from './SearchBar.style';
interface SearchBarProps {}

const SearchBar = (props: SearchBarProps) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    return (
        <SearchBarDiv>
            {/* <SearchInputIcon /> */}
            <SearchInput />
            <AreaInput />
            <DateInput />
            <KindSelect />
            <SearchButton>검색</SearchButton>
        </SearchBarDiv>
    );
};

export default SearchBar;
