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
    TagList,
} from './PostItemBox.style';
import penguin from 'assets/image/penguin.png';
import { Link } from 'react-router-dom';
import { Article, Lfp } from 'graphql/generated/generated';
import Font from '../Font';
import BookMark from '../BookMark';
import { YYYYMMDD } from 'utils/date';

interface PostItemProps {
    item: Article;
    bookmarked?: boolean;
    setBookmark: () => void;
}

const PostItem = (props: PostItemProps) => {
    const { item, bookmarked = false, setBookmark = () => {} } = props;
    const { id, articleDetail, createdAt, images } = item;
    const { breed, type, gender, location, age, gratuity } = articleDetail as Lfp;

    const isNotNull = (item: unknown) => {
        if (typeof item === 'number') {
            return item !== null && item !== undefined && item > 0;
        }
        return item !== null && item !== undefined;
    };
    return (
        <>
            <Link to={`/articleDetail/${id}`}>
                <ItemBox>
                    <BookMarkBox>
                        <BookMark active={bookmarked} onClick={setBookmark} />
                    </BookMarkBox>
                    <Thumb>
                        <Img src={images.length === 0 ? penguin : (images[0] as string)} alt="실종 동물" />
                    </Thumb>
                    <InfoList>
                        <InfoItem>
                            <InfoCategory>품종</InfoCategory>
                            <InfoText>{`${type} | ${breed}`}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>실종일</InfoCategory>
                            <InfoText>{YYYYMMDD(createdAt)}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>지역</InfoCategory>
                            <InfoText>{location.address.substr(0, 9)}</InfoText>
                        </InfoItem>
                    </InfoList>
                    <TagList>
                        {isNotNull(gender) && (
                            <ContentTag>
                                <Font label={gender as string} fontType="tag" />
                            </ContentTag>
                        )}
                        {age && (
                            <ContentTag>
                                <Font label={`${age}`} fontType="tag" />
                            </ContentTag>
                        )}
                        {isNotNull(gratuity) && (
                            <ContentTag>
                                <Font label={`사례금 ${gratuity}원`} fontType="tag" />
                            </ContentTag>
                        )}
                    </TagList>
                </ItemBox>
            </Link>
        </>
    );
};

export default PostItem;
