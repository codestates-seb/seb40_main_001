import React from 'react';
import { NicknameMypage } from '../molecules';
import { BatteryCase } from '../atoms';
import HNM from '../atoms/HNM';

const MyInfo = ({ profile }) => {
  return (
    <div className="flex flex-row h-[90px] w-[380px] pt-0.5 border-b border-b-main">
      <HNM target={profile} />
      <div className="flex flex-col ml-[15px]">
        <div className="mb-[10px]">
          <NicknameMypage nickname="토깽이" />
        </div>
        <BatteryCase charge="88" />
      </div>
    </div>
  );
};
export default MyInfo;
