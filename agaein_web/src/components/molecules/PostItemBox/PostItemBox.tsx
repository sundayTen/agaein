import { ItemBox, ItemLink, Thumb, Img, InfoList, InfoItem, InfoCategory, InfoText } from './PostItemBox.style';
import penguin from 'assets/image/penguin.png';
import { Article } from 'graphql/generated/generated';

interface PostItemProps {
    item: Article;
    onClick?: () => void;
}

const PostItem = (props: PostItemProps) => {
    return (
        <ItemBox>
            <ItemLink href="">
                <Thumb>
                    <Img src={penguin} alt="실종 동물" />
                </Thumb>
                <InfoList>
                    <InfoItem>
                        <InfoCategory>품종</InfoCategory>
                        <InfoText>개 | 웰시코기</InfoText>
                    </InfoItem>
                    <InfoItem>
                        <InfoCategory>실종일</InfoCategory>
                        <InfoText>2021-09-21</InfoText>
                    </InfoItem>
                    <InfoItem>
                        <InfoCategory>지역</InfoCategory>
                        <InfoText>서울 송파</InfoText>
                    </InfoItem>
                </InfoList>
            </ItemLink>
        </ItemBox>
    );
};

export default PostItem;
