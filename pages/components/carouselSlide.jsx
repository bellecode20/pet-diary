import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import carousel from "../../styles/components/carouselSlide.module.scss";
import { format } from "path";
const CarouselSlide = ({ data }) => {
  // console.log(`data1`);
  // console.log(data);
  useEffect(() => {
    console.log(`data2`);
    console.log(data);
  }, [data]);
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
            {data.map((img) => (
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
        <button className={carousel.embla__prev} onClick={scrollPrev}>
          Prev
        </button>
        <button className={carousel.embla__next} onClick={scrollNext}>
          Next
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
