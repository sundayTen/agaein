//@ts-nocheck
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import ReviewList from 'components/organism/ReviewList/ReviewList';
import PostList from 'components/organism/PostList/PostList';
import HomeHeader from 'components/organism/HomeHeader/HomeHeader';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <HomeHeader />
            <PostList title="찾습니다!" />
            <PostList title="발견했습니다!" />
            <ReviewList />
        </div>
    );
};

export default Home;
