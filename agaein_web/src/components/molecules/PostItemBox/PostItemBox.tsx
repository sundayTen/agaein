import { ItemBox, Thumb, Img, InfoList, InfoItem, InfoCategory, InfoText, ContentTag } from './PostItemBox.style';
import penguin from 'assets/image/penguin.png';
import { Link } from 'react-router-dom';
import { Article } from 'graphql/generated/generated';
import Font from '../Font';
import BookMark from '../BookMark';

interface PostItemProps {
    item: Article;
    bookmarked?: boolean;
    setBookmark: () => void;
}

const PostItem = (props: PostItemProps) => {
    const { item, bookmarked = false, setBookmark = () => {} } = props;
    const { id } = item;

    return (
        <>
            <Link to={`/articleDetail/${id}`}>
                <ItemBox>
                    <BookMark active={bookmarked} onClick={setBookmark} />
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
                    <ContentTag>
                        <Font label="암컷" fontType="tag" />
                    </ContentTag>
                    <ContentTag>
                        <Font label="9개월" fontType="tag" />
                    </ContentTag>
                </ItemBox>
            </Link>
        </>
    );
};

export default PostItem;
