import { RouteComponentProps } from 'react-router-dom';
import { ArticleListParams } from 'router/params';

const ArticleList = ({ match, history }: RouteComponentProps<ArticleListParams>) => {
    return (
        <div>
            <h1>요기는 게시글 리스트입니다</h1>
        </div>
    );
};

export default ArticleList;
