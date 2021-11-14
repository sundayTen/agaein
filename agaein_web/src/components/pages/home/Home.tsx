import { RouteComponentProps } from 'react-router-dom';
import HomeHeader from 'components/organism/HomeHeader/HomeHeader';
import HomeArticleList from 'components/organism/HomeArticleList';
import { Board_Type } from 'graphql/generated/generated';
import { Fragment } from 'react';

const Home = (_: RouteComponentProps) => {
    return (
        <Fragment>
            <HomeHeader />
            <HomeArticleList boardType={Board_Type.Lfg} />
            <HomeArticleList boardType={Board_Type.Lfp} />
            <HomeArticleList boardType={Board_Type.Review} />
        </Fragment>
    );
};

export default Home;
