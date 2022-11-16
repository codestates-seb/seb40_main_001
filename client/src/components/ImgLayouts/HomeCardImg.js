import React from 'react';

const HomeCard = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[26px] h-[26px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default HomeCard;
