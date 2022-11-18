import React from 'react';
import Drawer from '../atoms/Drawer';
import { LogoutBtn } from '../atoms';

const DrawerInfo = ({ img, name, handler }) => {
  return (
    <div className="flex flex-row items-center">
      <Drawer target={img} />
      <div className="flex flex-row w-full justify-between items-center">
        <div className="ml-5 text text-200">{name}</div>
        <LogoutBtn handler={handler} />
      </div>
    </div>
  );
};

export default DrawerInfo;
