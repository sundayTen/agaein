import { useState } from 'react';
import { Page, PaginationDiv } from './Pagination.style';

interface SearchBarProps {}

const Pagination = (props: SearchBarProps) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const onClickSelector = (index: number) => {
        setSelectedPage(index);
    };
    return (
        <PaginationDiv>
            <Page onClick={() => onClickSelector(selectedPage === 1 ? selectedPage : selectedPage - 1)}>&lt;</Page>
            {pages.map((_, index) => (
                <Page active={selectedPage === index + 1} onClick={() => onClickSelector(index + 1)}>
                    {index + 1}
                </Page>
            ))}
            <Page onClick={() => onClickSelector(selectedPage === 10 ? selectedPage : selectedPage + 1)}>&gt;</Page>
        </PaginationDiv>
    );
};

export default Pagination;
