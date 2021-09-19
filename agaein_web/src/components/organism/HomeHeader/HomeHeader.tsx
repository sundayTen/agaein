import Button from 'components/molecules/Button';
import { HeaderFirstFont, HeaderSecondFont, HomeHeaderButtonGroup, HomeHeaderContainer } from './HomeHeader.style';

const HomeHeader = () => {
    const onClickSearch = () => {
        console.log('Search Button Clicked');
    };
    const onClickCreate = () => {
        console.log('Create Button Clicked');
    };
    return (
        <HomeHeaderContainer>
            <HeaderFirstFont>실종견이 무사히 집에 갈 수 있도록</HeaderFirstFont>
            <HeaderSecondFont>잃어버린 강아지 함께 찾아드려요</HeaderSecondFont>
            <HomeHeaderButtonGroup>
                <Button color="#eee" label="게시글 작성" onClick={onClickCreate} />
                <Button color="white" label="강아지 검색" onClick={onClickSearch} />
            </HomeHeaderButtonGroup>
        </HomeHeaderContainer>
    );
};

export default HomeHeader;
