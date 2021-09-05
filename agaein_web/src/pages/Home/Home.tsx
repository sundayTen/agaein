import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useTestQuery } from 'graphql/generated';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    const { data, loading, error } = useTestQuery();
    console.log('🚀 ~ file: Home.tsx ~ line 9 ~ Home ~ data', error, loading, data);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
        </div>
    );
};

export default Home;
