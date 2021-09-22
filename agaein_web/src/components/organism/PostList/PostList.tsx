import PostItemBox from 'components/molecules/PostItemBox/PostItemBox';
import { ListHeader, HeaderTitle, ButtonViewAll, ListContainer, ListItem } from './PostList.style';

interface PostListProps {
    title?: string;
}

const PostList = (props: PostListProps) => {
    const { title } = props;

    return (
        <>
            <ListHeader>
                <HeaderTitle>{title}</HeaderTitle>
                <ButtonViewAll type="button">전체보기 &gt;</ButtonViewAll>
            </ListHeader>
            <ListContainer>
                <ListItem>
                    <PostItemBox />
                </ListItem>
                <ListItem>
                    <PostItemBox />
                </ListItem>
            </ListContainer>
        </>
    );
};

export default PostList;
