import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useState } from 'react';
import { BackIcon, CarouselContainer, FocusedImage, NextIcon, Page, PageContainer } from './WitnessImageCarousel.style';

interface ImageCarouselProps {
    images?: Maybe<string>[];
}

const WitnessImageCarousel = (props: ImageCarouselProps) => {
    const { images } = props;
    const [active, setActive] = useState(0);
    if (images) {
        return (
            <CarouselContainer>
                <FocusedImage alt="테스트" src={String(images[active])} />
                <BackIcon onClick={() => setActive(active === 0 ? active : active - 1)} />
                <NextIcon onClick={() => setActive(active === images.length - 1 ? active : active + 1)} />
                <PageContainer>
                    {images.map((item, idx) => {
                        return <Page key={idx} click={idx === active} />;
                    })}
                </PageContainer>
            </CarouselContainer>
        );
    } else {
        return null;
    }
};

export default WitnessImageCarousel;
