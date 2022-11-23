import React from 'react';
import { ReactComponent as Logo } from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';

const HeaderLogo = ({ txt, menuHandler }) => {
  const logoHandler = () => {
    console.log('logo');
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5">
      <Logo onClick={logoHandler} />
      <div className="text-400">{txt}</div>
      <Menu onClick={menuHandler} />
    </div>
  );
};

export default HeaderLogo;
