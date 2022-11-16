import React from 'react';

const Drawer = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[50px] h-[50px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default Drawer;
