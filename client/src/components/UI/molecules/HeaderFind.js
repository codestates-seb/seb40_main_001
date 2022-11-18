import React from 'react';
import { ReactComponent as Logo } from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Info } from '../../../assets/img/icons/info.svg';
import Dropdown from './MiniDropdown';

const HeaderFind = () => {
  const logoHandler = () => {
    console.log('logo');
  };
  const infoHandler = () => {
    console.log('info');
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center">
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
