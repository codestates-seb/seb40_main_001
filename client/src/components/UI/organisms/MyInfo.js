import React from 'react';
import { NicknameMypage } from '../molecules';
import { BatteryCase } from '../atoms';
import HNM from '../atoms/HNM';

const MyInfo = ({ profile, nickname, charge }) => {
  return (
    <div className="flex flex-row h-[90px] w-[350px] pt-0.5 border-b border-b-main">
      <HNM target={profile} />
      <div className="flex flex-col ml-[15px]">
        <div className="mb-[10px]">
          <NicknameMypage nickname={nickname} />
        </div>
        <BatteryCase charge={charge} />
      </div>
    </div>
  );
};
export default MyInfo;
