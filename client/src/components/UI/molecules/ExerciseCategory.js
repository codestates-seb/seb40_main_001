import React from 'react';
import ExerciseCarousel from './ExerciseCarousel';

const ExerciseCategory = ({ handler }) => {
  const arr = ['running', 'yoga', 'tennis', 'swim', 'weight', 'basketball'];

  return (
    <div>
      <div className="ml-5 text-400 text-low">카테고리</div>
      <ExerciseCarousel arr={arr} handler={handler} />
    </div>
  );
};

export default ExerciseCategory;
