import { Article, Bookmark, Comment, Lfg, Lfp, Review, ArticleDetailInput } from 'graphql/generated/generated';

// TODO : Type Guard의 조건을 더 엄밀하게 정의해야함

function isArticle(target: unknown): target is Article {
    return (target as Article).__typename === 'Article' && !!(target as Article).articleDetail.id;
}
function isComment(target: unknown): target is Comment {
    return (target as Comment).__typename === 'Comment' && (target as Comment).content !== null;
}
function isLFP(target: unknown): target is Lfp {
    return (target as Lfp).__typename === 'LFP' && !!(target as Lfp).lostDate;
}
function isLFG(target: unknown): target is Lfg {
    return (target as Lfg).__typename === 'LFG' && !!(target as Lfg).foundDate;
}
function isReview(target: unknown): target is Review {
    return (target as Review).__typename === 'REVIEW' && (target as Review).title !== null;
}
function isBookmark(target: unknown): target is Bookmark {
    return (target as Bookmark).__typename === 'Bookmark' && (target as Bookmark).articleId !== null;
}
function isComments(target: unknown[]): target is Comment[] {
    return (target as Comment[]).some((comment) => isComment(comment));
}

function isArticleDetail(target: unknown, dateType: 'lostDate' | 'foundDate'): target is ArticleDetailInput {
    return (
        !!(target as ArticleDetailInput).location?.address &&
        !!(target as ArticleDetailInput)[dateType] &&
        !!(target as ArticleDetailInput).breedId
    );
}

export { isArticle, isComment, isLFP, isLFG, isReview, isBookmark, isComments, isArticleDetail };
