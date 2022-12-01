import React from 'react';
import { NicknameMypage } from '../molecules';
import { BatteryCase } from '../atoms';
import HNM from '../atoms/HNM';

const MyInfo = ({ userData }) => {
  return (
    <div className="flex flex-row h-[90px] w-[350px] pt-0.5 border-b border-b-main">
      <HNM target={userData && userData.profile} />
      <div className="flex flex-col ml-[15px]">
        <div className="mb-[10px]">
          <NicknameMypage nickname={userData && userData.nickname} />
        </div>
        <BatteryCase charge={userData && userData.charge} />
      </div>
    </div>
  );
};
export default MyInfo;
