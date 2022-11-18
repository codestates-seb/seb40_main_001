import React from 'react';
import getIcon from '../../../utils/getIcon';

const ExerciseBtn = ({ exercise, handleClick }) => {
  const icon = getIcon(exercise);

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
