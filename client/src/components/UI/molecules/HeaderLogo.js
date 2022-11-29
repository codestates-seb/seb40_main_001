import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Logo, Menu } from '../../../assets/img';

const HeaderLogo = ({ txt, menuHandler, children }) => {
  const logoHandler = () => {
    if (txt) {
      // navigate('/');
    }
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5">
      <Logo onClick={logoHandler} />
      <div className="text-400">{txt}</div>
      <div className="absolute transform translate-x-[14rem]">{children}</div>
      <Menu onClick={menuHandler} />
    </div>
  );
};

export default HeaderLogo;
