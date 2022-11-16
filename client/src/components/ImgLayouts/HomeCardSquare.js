import React from 'react';

const HomeSquare = () => {
  const target = 'HS';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-[7px] w-[88px] h-[102px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default HomeSquare;
