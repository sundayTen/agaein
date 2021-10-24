import {
    ItemBox,
    Thumb,
    Img,
    InfoList,
    InfoItem,
    InfoCategory,
    InfoText,
    ContentTag,
    BookMarkBox,
} from './PostItemBox.style';
import penguin from 'assets/image/penguin.png';
import { Link } from 'react-router-dom';
import { Article, Lfg } from 'graphql/generated/generated';
import Font from '../Font';
import BookMark from '../BookMark';
import moment from 'moment';

interface PostItemProps {
    item: Article;
    bookmarked?: boolean;
    setBookmark: () => void;
}

const PostItem = (props: PostItemProps) => {
    const { item, bookmarked = false, setBookmark = () => {} } = props;
    const { id, articleDetail, createdAt } = item;
    const { breed, gender } = articleDetail as Lfg;

    return (
        <>
            <Link to={`/articleDetail/${id}`}>
                <ItemBox>
                    <BookMarkBox>
                        <BookMark active={bookmarked} onClick={setBookmark} />
                    </BookMarkBox>
                    <Thumb>
                        <Img src={penguin} alt="실종 동물" />
                    </Thumb>
                    <InfoList>
                        <InfoItem>
                            <InfoCategory>품종</InfoCategory>
                            <InfoText>{breed}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>실종일</InfoCategory>
                            <InfoText>{moment(createdAt).format('YYYY-MM-DD')}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>지역</InfoCategory>
                            <InfoText>서울 송파</InfoText>
                        </InfoItem>
                    </InfoList>
                    <ContentTag>
                        <Font label={gender} fontType="tag" />
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
