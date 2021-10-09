import { BookMarkActive, BookMarkContainer, BookMarkInActive } from './BookMark.style';

interface BookMarkProps {
    active: boolean;
    onClick: () => void;
}

const BookMark = (props: BookMarkProps) => {
    const { active, onClick } = props;

    return (
        <BookMarkContainer onClick={onClick}>{active ? <BookMarkActive /> : <BookMarkInActive />}</BookMarkContainer>
    );
};

export default BookMark;
