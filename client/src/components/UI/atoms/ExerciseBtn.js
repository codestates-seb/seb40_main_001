import React from 'react';
import getIcon from '../../../utils/getIcon';

const ExerciseBtn = ({ exercise, handleClick, selected }) => {
  const icon = getIcon(exercise, 'white');
  if (selected === exercise) {
    return (
      <button
        onClick={() => handleClick(exercise)}
        className="w-[55px] h-[55px] btn btn-circle hover:bg-main bg-main"
      >
        <div>{icon}</div>
      </button>
    );
  }
  return (
    <button
      onClick={() => handleClick(exercise)}
      className="w-[55px] h-[55px] btn btn-circle hover:bg-main bg-main-week"
    >
      <div>{icon}</div>
    </button>
  );
};

export default ExerciseBtn;
