import React from 'react';

const DrawerLayout = ({ target }) => {
  return (
    <div className="avatar placeholder drop-shadow">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[50px] h-[50px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default DrawerLayout;
