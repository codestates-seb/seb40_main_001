import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Logo, Menu } from '../../../assets/img';

const HeaderLogo = ({ txt, menuHandler, children, menu = false }) => {
  const logoHandler = () => {
    if (txt) {
      // navigate('/');
    }
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5">
      <Logo onClick={logoHandler} />
      <div className="text-400">{txt}</div>
      <div className="absolute transform translate-x-[14.6rem]">{children}</div>
      {menu ? <Menu onClick={menuHandler} /> : null}
    </div>
  );
};

export default HeaderLogo;
