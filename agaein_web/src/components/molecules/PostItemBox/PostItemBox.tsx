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
    const { id, articleDetail, createdAt, images } = item;
    const { breed, type, gender, location, age } = articleDetail as Lfg;

    function typeToKr() {
        if (type === 'DOG') {
            return '개';
        }
        if (type === 'CAT') {
            return '고양이';
        }
        return '기타';
    }

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
                            <InfoText>{`${typeToKr()} | ${breed}`}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>실종일</InfoCategory>
                            <InfoText>{moment(createdAt).format('YYYY-MM-DD')}</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoCategory>지역</InfoCategory>
                            <InfoText>{location.address.substr(0, 9)}</InfoText>
                        </InfoItem>
                    </InfoList>
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
                </ItemBox>
            </Link>
        </>
    );
};

export default PostItem;
