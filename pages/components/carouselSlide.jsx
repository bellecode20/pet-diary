import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import carousel from "../../styles/components/carouselSlide.module.scss";
import { format } from "path";
const CarouselSlide = ({ data }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    containScroll: "keepSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  const scrollPrev = useCallback(
    (e) => {
      e.preventDefault();
      if (embla) embla.scrollPrev();
    },
    [embla]
  );

  const scrollNext = useCallback(
    (e) => {
      e.preventDefault();
      if (embla) embla.scrollNext();
    },
    [embla]
  );
  useEffect(() => {
    if (embla) {
      embla.reInit();
      onSelect();
      setScrollSnaps(embla.scrollSnapList());
      embla.on("select", onSelect);
    }
  }, [embla, setScrollSnaps, onSelect, data]);
  return (
    <>
      <div className={carousel.embla}>
        <div className={carousel.embla__viewport} ref={viewportRef}>
          <div className={carousel.embla__container}>
            {data.map((img, i) => (
              <div
                className={carousel.embla__slide}
                id={carousel.slideId}
                key={i}
              >
                <Image
                  src={img}
                  alt="선택한 사진의 썸네일"
                  layout="fill"
                  objectFit="contain"
                  className={carousel.embla__slide__img}
                ></Image>
              </div>
            ))}
          </div>
        </div>
        <button className={carousel.embla__prev} onClick={scrollPrev}>
          <Image
            src="/slide--left.svg"
            alt="이전 썸네일 보기 버튼"
            width="50"
            height="50"
          ></Image>
        </button>
        <button className={carousel.embla__next} onClick={scrollNext}>
          <Image
            src="/slide--right.svg"
            alt="다음 썸네일 보기 버튼"
            width="50"
            height="50"
          ></Image>
        </button>
        <div className={carousel.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`${carousel.embla__dot} ${
                index === selectedIndex ? `${carousel.isSelected}` : ""
              }`}
              type="button"
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselSlide;
