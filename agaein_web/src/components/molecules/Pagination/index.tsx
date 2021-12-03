import { PageList, PageItem } from './Pagination.style';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

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
        <PageList>
            <PageItem type="button" onClick={() => setActive(active === 1 ? active : active - 1)}>
                <ChevronLeftIcon />
            </PageItem>
            {pages.map((_, index) => (
                <PageItem type="button" key={index} active={active === index + 1} onClick={() => setActive(index + 1)}>
                    {index + 1}
                </PageItem>
            ))}
            <PageItem type="button" onClick={() => setActive(active === 10 ? active : active + 1)}>
                <ChevronRightIcon />
            </PageItem>
        </PageList>
    );
};

export default Pagination;
