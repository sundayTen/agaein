import ArticleList from 'pages/article/ArticleList';
import CreateArticle from 'pages/article/CreateArticle';
import Home from 'pages/home/Home';
import { Route, Switch } from 'react-router-dom';

// * 요기서 찾는 사람과 찾은 사람 화면을 분기하고, Route 목록은 다른 파일로 뺀다.
function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/createArticle" component={CreateArticle} />
            <Route path="/articles" component={ArticleList} />
        </Switch>
    );
}

export default Router;
