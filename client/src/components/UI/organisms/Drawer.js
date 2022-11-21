import React from 'react';
import { DrawerInfo } from '../molecules';
import { ReactComponent as Add } from '../../../assets/img/icons/addPeople.svg';
import { ReactComponent as Mypage } from '../../../assets/img/icons/mypage.svg';

const Drawer = ({ img, name }) => {
  return (
    <div className="w-72 h-screen p-[14px] bg-white">
      <DrawerInfo img={img} name={name} />
      <div className="border-2 border-gray mt-7"></div>
      <div className="ml-[14px] mt-4">
        <div className="flex flex-row items-center text text-200 mb-[10px]">
          <Add />
          <div className="ml-[15px]">어라운더 찾기</div>
        </div>
        <div className="flex flex-row items-center text text-200">
          <Mypage />
          <div className="ml-[15px]">마이페이지</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;