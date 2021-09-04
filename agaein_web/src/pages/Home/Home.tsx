import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
        </div>
    );
};

export default Home;
