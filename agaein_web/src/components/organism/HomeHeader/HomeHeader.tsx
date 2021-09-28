import Button from 'components/molecules/Button';
import { HeaderFirstFont, HeaderSecondFont, HomeHeaderButtonGroup, HomeHeaderContainer } from './HomeHeader.style';

const HomeHeader = () => {
    const onClickCreate = () => {
        console.log('Create BUtton Clicked');
    };
    const onClickSearch = () => {
        console.log('Search Button Clicked');
    };

    return (
        <HomeHeaderContainer>
            <HeaderFirstFont>다시 내 곁으로 돌아올 수 있게</HeaderFirstFont>
            <HeaderSecondFont>잃어버린 동물 함께 찾아드려요</HeaderSecondFont>
            <HomeHeaderButtonGroup>
                <Button color="#eee" label="게시글 작성" onClick={onClickCreate} />
                <Button color="white" label="실종동물 검색" onClick={onClickSearch} />
            </HomeHeaderButtonGroup>
        </HomeHeaderContainer>
    );
};

export default HomeHeader;
