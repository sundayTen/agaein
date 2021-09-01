
import { BaseParams } from 'paramsModel/BaseParams';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const CreateArticle = ({ match, history }: RouteComponentProps<BaseParams>) => {
	console.log('파라미터 테스트 : ', match.params)
	return (
		<div>
			<h1>요기는 게시글 작성 페이지입니다</h1>
			<button onClick={() => history.push('/')}>페이지 이동</button>
		</div>
	);
}

export default CreateArticle;
