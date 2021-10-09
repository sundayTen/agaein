import { useState } from 'react';
import { Page, PaginationDiv } from './Pagination.style';

interface SearchBarProps {}

const Pagination = (props: SearchBarProps) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const onClickSelector = (index: number) => {
        setSelectedPage(index);
    };
    return (
        <PaginationDiv>
            <Page href="#" onClick={() => onClickSelector(selectedPage === 1 ? selectedPage : selectedPage - 1)}>
                &lt;
            </Page>
            <Page href="#" active={selectedPage === 1} onClick={() => onClickSelector(1)}>
                1
            </Page>
            <Page href="#" active={selectedPage === 2} onClick={() => onClickSelector(2)}>
                2
            </Page>
            <Page href="#" active={selectedPage === 3} onClick={() => onClickSelector(3)}>
                3
            </Page>
            <Page href="#" active={selectedPage === 4} onClick={() => onClickSelector(4)}>
                4
            </Page>
            <Page href="#" active={selectedPage === 5} onClick={() => onClickSelector(5)}>
                5
            </Page>
            <Page href="#" active={selectedPage === 6} onClick={() => onClickSelector(6)}>
                6
            </Page>
            <Page href="#" active={selectedPage === 7} onClick={() => onClickSelector(7)}>
                7
            </Page>
            <Page href="#" active={selectedPage === 8} onClick={() => onClickSelector(8)}>
                8
            </Page>
            <Page href="#" active={selectedPage === 9} onClick={() => onClickSelector(9)}>
                9
            </Page>
            <Page href="#" active={selectedPage === 10} onClick={() => onClickSelector(10)}>
                10
            </Page>
            <Page href="#" onClick={() => onClickSelector(selectedPage === 10 ? selectedPage : selectedPage + 1)}>
                &gt;
            </Page>
        </PaginationDiv>
    );
};

export default Pagination;
