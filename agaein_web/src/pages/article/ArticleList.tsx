import { BaseParams } from 'paramsModel/BaseParams';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ArticleList = (props: RouteComponentProps<BaseParams>) => {
    return (
        <div>
            <h1>요기는 게시글 리스트입니다</h1>
        </div>
    );
};

export default ArticleList;
