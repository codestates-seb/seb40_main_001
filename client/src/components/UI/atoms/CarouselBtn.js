import React from 'react';

const CarouselBtn = ({ href }) => {
  return (
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a
        href={href[0]}
        className="btn bg-main border-none hover:bg-transparent"
      >
        ❮
      </a>
      <a
        href={href[1]}
        className="btn bg-main border-none hover:bg-transparent"
      >
        ❯
      </a>
    </div>
  );
};

export default CarouselBtn;
