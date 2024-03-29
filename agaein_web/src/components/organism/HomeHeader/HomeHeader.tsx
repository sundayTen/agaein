import Button from 'components/molecules/Button';
import Font from 'components/molecules/Font';
import { useHistory } from 'react-router';
import { HomeHeaderButtonGroup, HomeHeaderContainer, HomeImage } from './HomeHeader.style';
import Home from 'assets/image/landing.png';

const HomeHeader = () => {
    const history = useHistory();
    const onClickCreate = () => {
        history.push('/createArticle/step1');
    };
    const onClickSearch = () => {
        history.push('/search');
    };

    return (
        <HomeHeaderContainer>
            <Font label="다시 내 곁으로 돌아올 수 있게" fontType="h3" fontWeight="normal" style={{ marginBottom: 8 }} />
            <Font label="잃어버린 동물 함께 찾아드려요" fontType="h1" fontWeight="bold" />
            <HomeHeaderButtonGroup>
                <Button buttonStyle={'PAINTED'} label="게시글 작성" size="LARGE" onClick={onClickCreate} />
                <Button label="실종동물 검색" size="LARGE" onClick={onClickSearch} />
            </HomeHeaderButtonGroup>
            <HomeImage src={Home} alt="메인화면 이미지" />
        </HomeHeaderContainer>
    );
};

export default HomeHeader;
