import { AreaInput, DateInput, KindSelect, SearchBarDiv, SearchButton, SearchInput } from './SearchBar.style';
interface SearchBarProps {}

const SearchBar = (props: SearchBarProps) => {
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
