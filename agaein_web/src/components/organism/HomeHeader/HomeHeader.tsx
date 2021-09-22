import Button from 'components/molecules/Button';
import {
    ArticleIdsFragmentDoc,
    Board_Type,
    GetArticlesDocument,
    useCreateArticleMutation,
} from 'graphql/generated/generated';
import { useEffect } from 'react';
import { HeaderFirstFont, HeaderSecondFont, HomeHeaderButtonGroup, HomeHeaderContainer } from './HomeHeader.style';

const HomeHeader = () => {
    const [createArticle, { client }] = useCreateArticleMutation();

    const onClickCreate = () => {
        createArticle({
            variables: {
                boardType: Board_Type.Lfg,
                Article: {
                    title: '타이틀 테스트',
                    content: '컨텐츠 테스트',
                },
            },
            update: (_, { data }) => {
                try {
                    const prevData = client.readQuery({
                        query: GetArticlesDocument,
                        variables: {
                            boardType: Board_Type.Lfg,
                        },
                    });
                    client.writeQuery({
                        query: GetArticlesDocument,
                        variables: {
                            boardType: Board_Type.Lfg,
                        },
                        data: {
                            Articles: [...prevData.Articles, data?.createArticle],
                        },
                        broadcast: true,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
        });
    };
    const onClickSearch = () => {
        console.log('Search Button Clicked');
    };

    return (
        <HomeHeaderContainer>
            <HeaderFirstFont>실종견이 무사히 집에 갈 수 있도록</HeaderFirstFont>
            <HeaderSecondFont>잃어버린 강아지 함께 찾아드려요</HeaderSecondFont>
            <HomeHeaderButtonGroup>
                <Button color="#eee" label="게시글 작성" onClick={onClickCreate} />
                <Button color="white" label="강아지 검색" onClick={onClickSearch} />
            </HomeHeaderButtonGroup>
        </HomeHeaderContainer>
    );
};

export default HomeHeader;
