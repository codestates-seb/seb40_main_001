import React from 'react';

const HNM = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[55px] h-[55px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default HNM;
