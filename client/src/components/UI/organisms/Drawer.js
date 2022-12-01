import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerInfo } from '../molecules';
import { AddPeople, Mypage } from '../../../assets/img';

const Drawer = ({ img, name }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 h-full p-[14px] bg-white">
      <DrawerInfo img={img} name={name} />
      <div className="border-2 border-gray mt-7"></div>
      <div className="ml-[14px] mt-4">
        <div
          className="flex flex-row items-center text text-200 mb-[10px]"
          onClick={() => navigate('/main')}
        >
          <AddPeople />
          <div className="ml-[15px]">어라운더 찾기</div>
        </div>
        <div
          className="flex flex-row items-center text text-200"
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
