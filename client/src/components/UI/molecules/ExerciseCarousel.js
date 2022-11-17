import React from 'react';
import { ExerciseBtn } from '../atoms';

const ExerciseCarousel = ({ arr }) => {
  const handleClick = e => {
    // e === exercise name
    // 선택된 버튼이 bg-main으로 유지되도록 하는 로직 추가 필요
    console.log(e);
  };

  return (
    <div className="carousel overflow-x-scroll w-[390px] h-[86px] flex items-center">
      {arr.map(el => (
        <div className="px-2.5 carousel-item" key={el}>
          <ExerciseBtn exercise={el} handleClick={handleClick} />
        </div>
      ))}
    </div>
  );
};

export default ExerciseCarousel;
