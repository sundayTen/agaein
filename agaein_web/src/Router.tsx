import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateArticle from './pages/article/CreateArticle';
import ArticleList from 'pages/article/ArticleList';
import Home from './pages/Home/Home';

// * 요기서 찾는 사람과 찾은 사람 화면을 분기하고, Route 목록은 다른 파일로 뺀다.
function Router() {
    return (
        <>
            <Route path="/" component={Home} exact />
            <Route path="/createArticle/:id" component={CreateArticle} />

        </>
    );
}

export default Router;
