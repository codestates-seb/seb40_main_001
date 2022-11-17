import React from 'react';

const HomeSquare = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-[7px] w-[88px] h-[102px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default HomeSquare;
