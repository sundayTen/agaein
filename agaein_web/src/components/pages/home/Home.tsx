//@ts-nocheck
import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import KakaoMap from 'components/organism/kakaomap/KakaoMap';
import Input from 'components/atoms/Input';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');

    const onChange = (e) => {
        setInputValue(e.target.value);
    };
    const mapSearch = (e) => {
        e.preventDefault();
        setSearch(inputValue);
        setInputValue('');
    };
    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
            <form className="inputForm" onSubmit={mapSearch}>
                <Input placeholder="검색어를 입력하세요" onChange={onChange} value={inputValue} />
                <button type="submit">검색</button>
            </form>
            <KakaoMap search={search} />
        </div>
    );
};

export default Home;
