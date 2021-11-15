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
import { Article, Lfg } from 'graphql/generated/generated';
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
    const { breed, type, gender, location, age } = articleDetail as Lfg;

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
                    {/* TODO : 옵셔널 데이터를 어디까지 보여줄 지 논의해야 함 */}
                    <TagList>
                        {gender && (
                            <ContentTag>
                                <Font label={gender} fontType="tag" />
                            </ContentTag>
                        )}
                        {age && (
                            <ContentTag>
                                <Font label={`${age}살`} fontType="tag" />
                            </ContentTag>
                        )}
                    </TagList>
                </ItemBox>
            </Link>
        </>
    );
};

export default PostItem;
