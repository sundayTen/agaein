import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useGetUsersQuery } from 'graphql/generated';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    const { data, loading, error } = useGetUsersQuery();
    console.log('🚀 OutPut is -->  ~ Home ~ data', data, loading, error);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <h1>홈 페이지</h1>
        </div>
    );
};

export default Home;
