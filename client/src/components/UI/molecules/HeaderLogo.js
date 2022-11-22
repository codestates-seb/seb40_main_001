import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';

const HeaderLogo = ({ txt, menuHandler }) => {
  // const navigate = useNavigate();

  const logoHandler = () => {
    if (txt) {
      // navigate('/');
    }
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
