import { Route, Switch } from 'react-router-dom';
import Home from 'components/pages/home/Home';
import CreateArticleStep1 from 'components/pages/createArticle/Step1';
import CreateArticleStep2 from 'components/pages/createArticle/Step2';
import CreateArticleStep3 from 'components/pages/createArticle/Step3';
import ArticleDetail from 'components/pages/article/articleDetail';
import ArticleList from 'components/pages/article/articleList';
import Search from 'components/pages/search/Search';
import Review from 'components/pages/review/Review';
import ReviewList from 'components/pages/review/ReviewList';
import CrawlingResultPage from 'components/pages/crawling/CrawlingResultPage';

// * 요기서 찾는 사람과 찾은 사람 화면을 분기하고, Route 목록은 다른 파일로 뺀다.
function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/articles/:type" component={ArticleList} />
            <Route path="/createArticle/step1" component={CreateArticleStep1} />
            <Route path="/createArticle/step2/:type/:id?" component={CreateArticleStep2} />
            <Route path="/createArticle/step3/:id" component={CreateArticleStep3} />
            <Route path="/articleDetail/:id" component={ArticleDetail} />
            <Route path="/search" component={Search} />
            <Route path="/createReview" component={Review} />
            <Route path="/reviews" component={ReviewList} />
            <Route path="/crawlingResult" component={CrawlingResultPage} />
        </Switch>
    );
}

export default Router;
