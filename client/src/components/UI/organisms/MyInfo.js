import React from 'react';
import { NicknameMypage } from '../molecules';
import { BatteryCase, HNM, ImgAddBtn } from '../atoms';

const MyInfo = ({ userData, setUserData, imageHandler, changeName }) => {
  return (
    <div className="flex flex-row h-[90px] w-[350px] pt-0.5 border-b border-b-main">
      <div className="">
        <HNM target={userData && userData.profile} />
        <div className="fixed top-0 transform translate-x-8 translate-y-28">
          <ImgAddBtn handleFile={imageHandler} />
        </div>
      </div>
      <div className="flex flex-col ml-[15px]">
        <div className="mb-[10px]">
          <NicknameMypage
            userData={userData}
            setUserData={setUserData}
            changeName={changeName}
          />
        </div>
        <BatteryCase charge={userData && userData.charge} />
      </div>
    </div>
  );
};
export default MyInfo;
