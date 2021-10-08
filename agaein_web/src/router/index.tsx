import { Route, Switch } from 'react-router-dom';
import Home from 'components/pages/home/Home';
import ArticleList from 'components/pages/article/ArticleList';
import CreateArticleStep1 from 'components/pages/createArticle/Step1';
import CreateArticleStep2 from 'components/pages/createArticle/Step2';
import CreateArticleStep3 from 'components/pages/createArticle/Step3';
import articleDetail from 'components/pages/article/articleDetail';

// * 요기서 찾는 사람과 찾은 사람 화면을 분기하고, Route 목록은 다른 파일로 뺀다.
function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/articles/" component={ArticleList} />
            <Route path="/createArticle/step1" component={CreateArticleStep1} />
            {/* 이건 사용될 일 없음 (나중에 제거해도 됨) */}
            <Route path="/createArticle/step2" exact />
            <Route path="/createArticle/step2/:type" component={CreateArticleStep2} />
            <Route path="/createArticle/step3" component={CreateArticleStep3} />
            <Route path="/articleDetail/:id" component={articleDetail} />
        </Switch>
    );
}

export default Router;
