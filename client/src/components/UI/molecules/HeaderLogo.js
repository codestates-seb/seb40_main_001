import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Logo, Menu } from '../../../assets/img';

const HeaderLogo = ({ txt, menuHandler, children, menu = false }) => {
  const navigate = useNavigate();
  const logoHandler = () => {
    navigate('/main');
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5 z-50 fixed top-0 bg-white">
      <Logo onClick={logoHandler} className="cursor-pointer" />
      <div className="text-400">{txt}</div>
      <div className="absolute transform translate-x-[14.6rem]">{children}</div>
      {menu ? <Menu onClick={menuHandler} className="cursor-pointer" /> : null}
    </div>
  );
};

export default HeaderLogo;
