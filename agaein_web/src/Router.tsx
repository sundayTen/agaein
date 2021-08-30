import React from 'react';
import { Route } from 'react-router-dom';
import CreateArticle from './pages/article/CreateArticle';
import Home from './pages/Home/Home';

function Router() {
    return (
        <>
            <Route path="/" component={Home} exact />
            <Route path="/createArticle" component={CreateArticle} />
        </>
    );
}

export default Router;
