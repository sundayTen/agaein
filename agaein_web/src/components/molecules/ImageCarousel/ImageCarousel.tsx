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
                <FocusedImage alt="테스트" src={images[active]} />
            </FocusedImageWrapper>
            <CarouselList>
                {images.map((img, index) => (
                    <SmallImgWrapper>
                        <SmallImg
                            key={index.toString()}
                            src={img}
                            active={index === active}
                            onClick={() => setActive(index)}
                        />
                    </SmallImgWrapper>
                ))}
            </CarouselList>
        </CarouselContainer>
    );
};

export default ImageCarousel;
