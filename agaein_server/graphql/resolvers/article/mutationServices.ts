import { Upload } from 'graphql-upload';
import { ID } from '../../customTypes';
import { knex } from '../../database';
import { ArticleDetailInput, Board_Type, Finding_Status, Maybe } from '../../types';

export async function done(articleType: string, articleId: ID) {
    await knex(articleType)
        .update({
            status: Finding_Status.Done,
        })
        .where('article_id', articleId);
}

export async function getArticleDetailForm(article: any, articleDetail: any) {
    const {
        breedId,
        name,
        feature,
        gender,
        location,
        foundDate,
        lostDate,
        gratuity,
        alarm,
        password,
        email,
        age,
        title,
        content,
    } = articleDetail;

    return {
        LFG: {
            articleId: article.id,
            breedId,
            name,
            feature,
            gender,
            location,
            foundDate,
            alarm,
            password,
            email,
            age,
        },
        LFP: {
            articleId: article.id,
            breedId,
            name,
            feature,
            gender,
            location,
            lostDate,
            gratuity,
            alarm,
            password,
            email,
            age,
        },
        REVIEW: {
            articleId: article.id,
            title,
            content,
        },
    };
}

export async function createArticle(
    article: any,
    boardType: Board_Type,
    articleDetail: ArticleDetailInput,
    files: Array<Upload>,
) {
    return await knex.transaction(async (trx: any) => {
        return await knex('article')
            .transacting(trx)
            .insert(article)
            .returning('id')
            .then(async (articleId: any) => {
                article.id = articleId[0];
                const articleDetailForm: any = await getArticleDetailForm(article, articleDetail);

                return await knex(boardType)
                    .transacting(trx)
                    .insert(articleDetailForm[boardType])
                    .returning('id')
                    .then(async (articleDetailId: any) => {
                        articleDetailForm[boardType].id = articleDetailId[0];
                        if (boardType === 'LFG' || boardType === 'LFP') {
                            articleDetailForm[boardType].keyword = articleDetail.keyword;
                        }
                        article.articleDetail = articleDetailForm[boardType];
                        article.articleDetail.articleType = boardType;

                        if (articleDetail.keyword != null) {
                            await updateArticleKeywords(trx, articleDetail.keyword, article.id);
                        }

                        await updateArticleImages(trx, files, article.id);
                    });
            })
            .then(() => {
                return article;
            });
    });
}

async function updateArticleKeywords(trx: any, keyword: Array<Maybe<string>>, articleId: number) {
    const keywordForm: any = [];
    keyword.forEach(async (word: Maybe<string>) => {
        keywordForm.push({ keyword: word });
    });

    const keywordId = await knex('keyword').insert(keywordForm).onConflict('keyword').merge().returning('id');

    if (keywordId[0] !== undefined) {
        const articleKeywordForm: any = [];
        keywordId.forEach(async (id: string) => {
            articleKeywordForm.push({ articleId, keywordId: id });
        });
        await knex('article_keyword').transacting(trx).insert(articleKeywordForm);
    }
}

async function updateArticleImages(trx: any, files: Array<Upload>, articleId: number) {
    files.forEach(async (file: any, idx: Number) => {
        const { createReadStream, mimetype } = await file;
        const stream = createReadStream();

        const filename = articleId + '_' + idx + '_' + Date.now() + '.' + mimetype.split('/')[1];

        const imageForm = {
            articleId,
            url: 'https://www.agaein.com/file/image/' + filename,
        };

        await knex('image').transacting(trx).insert(imageForm);

        const out = require('fs').createWriteStream('image/' + filename);
        await stream.pipe(out);
        await stream.on('close', () => {
            console.log(`${new Date()} store ${filename}`);
        });
    });
}

export async function updateArticle(id: ID, article: any, articleDetail: ArticleDetailInput, files: Array<Upload>) {
    return await knex.transaction(async (trx: any) => {
        return await knex('article')
            .transacting(trx)
            .update(article)
            .where('id', id)
            .returning('*')
            .then(async (updatedArticle: any) => {
                article.id = updatedArticle[0].id;
                article.view = updatedArticle[0].view;
                article.type = updatedArticle[0].type;
                article.createdAt = updatedArticle[0].createdAt;

                const boardType = article.type;

                const articleDetailForm: any = { ...articleDetail };
                delete articleDetailForm.keyword;

                return await knex(boardType)
                    .transacting(trx)
                    .update(articleDetailForm)
                    .where('article_id', id)
                    .returning('*')
                    .then(async (updatedArticleDetail: any) => {
                        article.articleDetail = updatedArticleDetail[0];
                        article.articleDetail.articleType = boardType;

                        if (articleDetail.keyword != null) {
                            await knex('article_keyword').transacting(trx).where('article_id', article.id).del();
                            await updateArticleKeywords(trx, articleDetail.keyword, article.id);
                        }

                        if (files[0]) {
                            await knex('image').transacting(trx).where('article_id', article.id).del();
                            await updateArticleImages(trx, files, article.id);
                        }
                    });
            })
            .then(() => {
                return article;
            });
    });
}

export async function deleteArticle(id: ID) {
    await knex('article').where('id', id).del();

    return id;
}
