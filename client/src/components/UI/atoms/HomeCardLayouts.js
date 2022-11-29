import React from 'react';

const HomeCL = ({ source }) => {
  return (
    <div className="card w-[350px] h-[150px] bg-white card-bordered border-2 border-main drop-shadow-lg rounded-[20px] hover:scale-105 transition duration-400">
      {source}
    </div>
  );
};

export default HomeCL;
