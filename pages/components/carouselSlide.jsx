import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import carousel from "../../styles/components/carouselSlide.module.scss";
const CarouselSlide = ({ data }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  return (
    <div className={carousel.embla}>
      <div className={carousel.embla__viewport} ref={viewportRef}>
        <div className={carousel.embla__container}>
          {data.photo.map((img) => (
            <div className={carousel.embla__slide} id={carousel.slideId}>
              <Image
                layout="fill"
                objectFit="contain"
                className={carousel.embla__slide__img}
                src={img}
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
