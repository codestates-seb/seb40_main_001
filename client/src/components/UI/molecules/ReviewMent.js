import React from 'react';
import { Question } from '../../../assets/img';
import { LightBtn } from '../atoms';

const ReviewMent = ({ color, setColor, ment }) => {
  const lightColors = ['#FF7B8E', '#FF8A00', '#FFE500', '#7FD1AE', '#7ACE82'];

  const changeColor = idx => {
    if (color[idx] === 'white') {
      const newColor = [...color];
      let i = 0;
      while (i <= idx) {
        newColor[i] = lightColors[i];
        i += 1;
      }
      setColor(newColor);
    } else {
      const newColor = [...color];
      let j = 4;
      while (j > idx) {
        newColor[j] = 'white';
        j -= 1;
      }
      setColor(newColor);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <Question />
        <div className="text text-200 ml-[5px]">{ment}</div>
      </div>
      <div className="flex flex-row mt-4 ml-3.5">
        {color.map((el, idx) => (
          <LightBtn
            color={el}
            key={idx}
            index={idx}
            changeColor={changeColor}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewMent;
