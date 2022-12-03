import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerInfo } from '../molecules';
import { AddPeople, Mypage } from '../../../assets/img';
import { preClient } from '../../../client/client';

const Drawer = ({ img, name }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    preClient.post('/auth/logout');
    alert('로그아웃이 완료되었습니다.');
    navigate('/login');
  };

  return (
    <div className="w-full p-[14px] bg-white shadow rounded-b-2xl">
      <DrawerInfo img={img} name={name} handler={logoutHandler} />
      <div className="border-2 border-gray mt-7"></div>
      <div className="ml-[14px] mt-5">
        <div
          className="flex flex-row items-center text text-200 mb-5"
          onClick={() => navigate('/main')}
        >
          <AddPeople />
          <div className="ml-[15px]">어라운더 찾기</div>
        </div>
        <div
          className="flex flex-row items-center text text-200 mb-5"
          onClick={() => navigate('/mypage')}
        >
          <Mypage />
          <div className="ml-[15px]">마이페이지</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
