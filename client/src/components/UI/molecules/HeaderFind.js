import React from 'react';
import { Logo, Info } from '../../../assets/img';
import Dropdown from './MiniDropdown';

const HeaderFind = () => {
  const logoHandler = () => {
    console.log('logo');
  };
  const infoHandler = () => {
    console.log('info');
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5">
      <Logo onClick={logoHandler} />
      <div className="flex flex-row">
        <div className="ml-[60px] text-400">어라운더 찾기</div>
        <Info onClick={infoHandler} />
      </div>
      <Dropdown />
    </div>
  );
};

export default HeaderFind;
