import { Page, PageText, PaginationDiv } from './Pagination.style';

interface SearchBarProps {
    active: number;
    setActive: (value: number) => void;
    lastPage?: number;
}

const Pagination = (props: SearchBarProps) => {
    const { active, setActive, lastPage = 5 } = props;
    let pages = Array(lastPage)
        .fill(1)
        .map((_, i) => i);

    return (
        <PaginationDiv>
            <Page onClick={() => setActive(active === 1 ? active : active - 1)}>&lt;</Page>
            {pages.map((_, index) => (
                <Page active={active === index + 1} onClick={() => setActive(index + 1)}>
                    <PageText active={active === index + 1}>{index + 1}</PageText>
                </Page>
            ))}
            <Page onClick={() => setActive(active === 10 ? active : active + 1)}>&gt;</Page>
        </PaginationDiv>
    );
};

export default Pagination;
