import React from 'react';
import ExerciseCarousel from './ExerciseCarousel';

const ExerciseCategory = ({ handler, data, isWrite }) => {
  const arr = [
    'ALL',
    'RUNNING',
    'YOGA',
    'FITNESS',
    'SWIMMING',
    'BASKETBALL',
    'BADMINTON',
  ];

  if (isWrite && arr.length > 6) {
    arr.shift();
  }

  return (
    <div>
      <div className="ml-5 text-400 text-low">카테고리</div>
      <ExerciseCarousel data={data} arr={arr} handler={handler} />
    </div>
  );
};

export default ExerciseCategory;
