import { useState } from 'react';
import {
    CarouselContainer,
    CarouselList,
    FocusedImageWrapper,
    FocusedImage,
    SmallImgWrapper,
    SmallImg,
} from './ImageCarousel.style';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel = (props: ImageCarouselProps) => {
    const { images } = props;
    const [active, setActive] = useState(0);
    return (
        <CarouselContainer>
            <FocusedImageWrapper>
                <FocusedImage alt="캐러셀 메인 사진" src={images[active]} />
            </FocusedImageWrapper>
            <CarouselList>
                {images.map((img, index) => (
                    <SmallImgWrapper key={index.toString()}>
                        <SmallImg
                            src={img}
                            active={index === active}
                            onClick={() => setActive(index)}
                            alt="미리보기 사진"
                        />
                    </SmallImgWrapper>
                ))}
            </CarouselList>
        </CarouselContainer>
    );
};

export default ImageCarousel;
