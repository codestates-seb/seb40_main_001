import React, { useState } from 'react';
import { ExerciseBtn } from '../atoms';

const ExerciseCarousel = ({ arr, handler }) => {
  const [isSelect, setIsSelect] = useState('');
  const handleClick = e => {
    // e === exercise name
    setIsSelect(e);
    handler('exercise', e.toUpperCase());
  };

  return (
    <div className="carousel overflow-x-scroll mx-5 w-[350px] h-[86px] flex items-center">
      {arr.map(el => (
        <div className="px-2 carousel-item" key={el}>
          <ExerciseBtn
            exercise={el}
            handleClick={handleClick}
            selected={isSelect}
          />
        </div>
      ))}
    </div>
  );
};

export default ExerciseCarousel;
