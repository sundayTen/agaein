//@ts-nocheck
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import ReviewList from 'components/templates/ReviewList/ReviewList';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <ReviewList />
        </div>
    );
};

export default Home;
