import { ItemBox, Thumb, Img, InfoList, InfoItem, InfoCategory, InfoText } from './PostItemBox.style';
import penguin from 'assets/image/penguin.png';
import { Link } from 'react-router-dom';
import { Article, Lfp } from 'graphql/generated/generated';

interface PostItemProps {
    item: Article;
}

const PostItem = (props: PostItemProps) => {
    const { item } = props;
    const { id } = item;
    return (
        <Link to={`/articleDetail/${id}`}>
            <ItemBox>
                <Thumb>
                    <Img src={penguin} alt="실종 동물" />
                </Thumb>
                <InfoList>
                    <InfoItem>
                        <InfoCategory>품종</InfoCategory>
                        <InfoText>시고르자브종</InfoText>
                    </InfoItem>
                    <InfoItem>
                        <InfoCategory>실종일</InfoCategory>
                        <InfoText>2021-09-10</InfoText>
                    </InfoItem>
                    <InfoItem>
                        <InfoCategory>지역</InfoCategory>
                        <InfoText>서울 송파</InfoText>
                    </InfoItem>
                </InfoList>
            </ItemBox>
        </Link>
    );
};

export default PostItem;
