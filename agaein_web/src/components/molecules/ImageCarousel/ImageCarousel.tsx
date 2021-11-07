import { useState } from 'react';
import { CarouselContainer, CarouselList, FocusedImage, SmallImg } from './ImageCarousel.style';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel = (props: ImageCarouselProps) => {
    const { images } = props;
    const [active, setActive] = useState(0);
    return (
        <CarouselContainer>
            <FocusedImage alt="테스트" src={images[active]} />
            <CarouselList>
                {images.map((img, index) => (
                    <SmallImg
                        key={index.toString()}
                        src={img}
                        active={index === active}
                        onClick={() => setActive(index)}
                    />
                ))}
            </CarouselList>
        </CarouselContainer>
    );
};

export default ImageCarousel;
