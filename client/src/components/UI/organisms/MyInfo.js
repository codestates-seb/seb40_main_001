import React, { useEffect, useState } from 'react';
import { NicknameMypage } from '../molecules';
import { BatteryCase, HNM, ImgAddBtn } from '../atoms';

const MyInfo = ({ infoData, setUserData, imageHandler, changeName }) => {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [charge, setCharge] = useState();

  useEffect(() => {
    if (infoData) {
      setProfile(infoData.profile);
      setName(infoData.nickname);
      setCharge(infoData.charge);
    }
  }, [infoData]);
  return (
    <div className="flex flex-row h-[90px] w-[350px] pt-0.5 border-b border-b-main">
      <div className="">
        <HNM target={profile} />
        <div className="fixed top-0 transform translate-x-8 translate-y-28">
          <ImgAddBtn handleFile={imageHandler} />
        </div>
      </div>
      <div className="flex flex-col ml-[15px]">
        <div className="mb-[10px]">
          <NicknameMypage
            nickname={name}
            setUserData={setUserData}
            changeName={changeName}
          />
        </div>
        <BatteryCase charge={charge} />
      </div>
    </div>
  );
};
export default MyInfo;
