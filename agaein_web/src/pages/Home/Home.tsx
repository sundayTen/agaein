import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const Home = () => {
    const theme = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
        </div>
    );
};

export default Home;
