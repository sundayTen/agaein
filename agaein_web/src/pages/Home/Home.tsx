import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
            <button onClick={() => history.push('/createArticle/test')}>페이지 이동</button>
        </div>
    );
};

export default Home;
