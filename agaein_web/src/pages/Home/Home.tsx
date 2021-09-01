import Input from 'components/Input';
import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    // TODO : DELETE - For Input Component Test
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState<string>();

    const _setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
            <Input ref={inputRef} value={inputValue} onChange={_setInputValue} />
            <Link to="/createArticle/하하">ARTICLES</Link>
        </div>
    );
};

export default Home;
