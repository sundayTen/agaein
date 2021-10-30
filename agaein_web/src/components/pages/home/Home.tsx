import { RouteComponentProps } from 'react-router-dom';
import HomeHeader from 'components/organism/HomeHeader/HomeHeader';
import HomeArticleList from 'components/organism/HomeArticleList';
import { Board_Type } from 'graphql/generated/generated';

const Home = ({ history }: RouteComponentProps) => {
    return (
        <div>
            <HomeHeader />
            <HomeArticleList boardType={Board_Type.Lfg} />
            <HomeArticleList boardType={Board_Type.Lfp} />
            <HomeArticleList boardType={Board_Type.Review} />
        </div>
    );
};

export default Home;
