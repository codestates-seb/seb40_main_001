import React from 'react';
import { CarouselBtn } from '../atoms';

const Carousel = ({ img }) => {
  // img 배열
  // 기존 = img src={img[0]}
  // 수정 = img src={img[0].src}
  // 데이터 받을 때 양식 맞춰서 바꾸면 될 것 같습니다.
  if (img.length === 0) {
    return <></>;
  }
  if (img.length === 1) {
    return (
      <div className="carousel w-[368px] h-[231px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={img[0].remotePath} className="w-full" />
          <CarouselBtn />
        </div>
      </div>
    );
  }
  if (img.length === 2) {
    return (
      <div className="carousel w-[368px] h-[231px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={img[0].remotePath} className="w-full" />
          <CarouselBtn href={['#slide2']} />
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={img[1].remotePath} className="w-full" />
          <CarouselBtn href={['#slide1']} />
        </div>
      </div>
    );
  }
  return (
    <div className="carousel w-[368px] h-[231px]">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img[0].remotePath} className="w-full" />
        <CarouselBtn href={['#slide3', '#slide2']} />
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={img[1].remotePath} className="w-full" />
        <CarouselBtn href={['#slide1', '#slide3']} />
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={img[2].remotePath} className="w-full" />
        <CarouselBtn href={['#slide2', '#slide1']} />
      </div>
    </div>
  );
};

export default Carousel;
