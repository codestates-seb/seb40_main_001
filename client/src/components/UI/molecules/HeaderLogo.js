import React from 'react';
import { ReactComponent as Logo } from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';

const HeaderLogo = ({ txt }) => {
  const logoHandler = () => {
    console.log('logo');
  };
  const menuHandler = () => {
    console.log('menu');
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center">
      <Logo onClick={logoHandler} />
      <div className="text-400">{txt}</div>
      <Menu onClick={menuHandler} />
    </div>
  );
};

export default HeaderLogo;
