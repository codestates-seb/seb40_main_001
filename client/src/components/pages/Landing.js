import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Around } from '../../assets/img/icons/around.svg';

const LandingPage = () => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const navigate = useNavigate();

  const navigateLogin = () => {
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };
  const navigateMain = () => {
    setTimeout(() => {
      navigate('/main');
    }, 1500);
  };

  useEffect(() => {
    if (accessToken === '') {
      navigateLogin();
      return () => {
        clearTimeout(navigateLogin);
      };
    }
    navigateMain();
    return () => {
      clearTimeout(navigateMain);
    };
  });

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Around />
    </div>
  );
};

export default LandingPage;
