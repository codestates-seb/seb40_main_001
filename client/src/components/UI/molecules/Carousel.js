import React from 'react';
import { CarouselBtn } from '../atoms';

const Carousel = ({ img }) => {
  // img 배열
  return (
    <div className="carousel w-[368px] h-[231px]">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img[0]} className="w-full" />
        <CarouselBtn href={['#slide3', '#slide2']} />
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={img[1]} className="w-full" />
        <CarouselBtn href={['#slide1', '#slide3']} />
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={img[2]} className="w-full" />
        <CarouselBtn href={['#slide2', '#slide1']} />
      </div>
    </div>
  );
};

export default Carousel;
