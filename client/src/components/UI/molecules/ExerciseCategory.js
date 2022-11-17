import React from 'react';
import ExerciseCarousel from './ExerciseCarousel';

const ExerciseCategory = () => {
  const arr = ['running', 'yoga', 'tennis', 'swim', 'weight', 'basketball'];

  return (
    <div>
      <div className="ml-5 text-400 text-low">카테고리</div>
      <ExerciseCarousel arr={arr}> </ExerciseCarousel>
    </div>
  );
};

export default ExerciseCategory;
