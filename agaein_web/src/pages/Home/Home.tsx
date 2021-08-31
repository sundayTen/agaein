import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const Home = () => {
    const theme = useContext(ThemeContext);
    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
            <img
                width={100}
                height={100}
                src="/assets/image/penguin.png"
                alt="Grapefruit slice atop a pile of other slices"
            />
        </div>
    );
};

export default Home;
