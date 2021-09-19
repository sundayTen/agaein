//@ts-nocheck
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import ReviewList from 'components/templates/ReviewList/ReviewList';
import PostList from 'components/templates/PostList/PostList';

const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <Container>
                <PostList title="찾습니다!" />
                <PostList title="발견했습니다!" />
                <ReviewList />
            </Container>
        </div>
    );
};

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export default Home;
