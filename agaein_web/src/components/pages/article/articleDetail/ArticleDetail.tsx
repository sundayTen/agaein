import Chip from 'components/molecules/Chip';
import Font from 'components/molecules/Font';
import moment from 'moment';
import ImageCarousel from 'components/molecules/ImageCarousel/ImageCarousel';
import { Article, Board_Type, Comment as CommentType, useGetArticleQuery } from 'graphql/generated/generated';
import { RouteComponentProps } from 'react-router';
import { ArticleDetailParams } from 'router/params';
import {
    ArticleDetailContentContainer,
    ArticleDetailDetailContainer,
    ArticleDetailTitleContainer,
    titleStyles,
} from './ArticleDetail.style';
import Comment from 'components/organism/Comment';

const ArticleDetail = ({ match, history }: RouteComponentProps<ArticleDetailParams>) => {
    const { data, error, loading } = useGetArticleQuery({
        variables: {
            id: match.params.id,
            boardType: Board_Type.Lfg,
        },
    });
    // ? util함수로 빼서 쓰는게 좋을듯?
    const getBoardName = (boardType: Board_Type) => {
        switch (boardType) {
            case Board_Type.Lfg:
                return '찾고 있어요';
            case Board_Type.Lfp:
                return '발견 했어요';
            case Board_Type.Review:
                return '찾은 후기';
            default:
                return '';
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occur</p>;
    const { title, content, createdAt } = data?.Article as Article;

    return (
        <>
            <ArticleDetailTitleContainer>
                <Chip label="진행중" />
                <Font
                    label={getBoardName(Board_Type.Lfg)}
                    fontType="h4"
                    fontWeight="bold"
                    htmlElement="span"
                    style={titleStyles}
                />
                <Font label={title} fontType="h4" htmlElement="span" />
            </ArticleDetailTitleContainer>
            <ArticleDetailDetailContainer>이곳에 게시글 상세정보가 들어감</ArticleDetailDetailContainer>
            <ImageCarousel />
            <ArticleDetailContentContainer>
                <Font label={content} fontType="label" style={{ marginBottom: 20 }} />
                <Font label={moment(createdAt).format('YY.MM.DD HH:mm:ss')} fontType="tag" />
            </ArticleDetailContentContainer>
            <Comment comments={[]} />
        </>
    );
};

export default ArticleDetail;
