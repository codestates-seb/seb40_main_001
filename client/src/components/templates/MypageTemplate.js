import React, { useState } from 'react';
import { HeaderLogo } from '../UI/molecules';
import MyInfo from '../UI/organisms/MyInfo';
import ArounderRecord from '../UI/organisms/ArounderRecord';
import Modal from '../UI/organisms/Modal';
import Drawer from '../UI/organisms/Drawer';

const MypageTemplate = ({ userData, data }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState('');

  const closeModal = () => {
    setIsModal(false);
    console.log(score);
  };

  const openModal = () => {
    setIsModal(true);
  };

  const menuHandler = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className="relative">
      <div>
        {/* 배경 흐리게 */}
        {isDrawer ? (
          <div className="mt-[55px] w-full h-full absolute bg-black opacity-50 z-10"></div>
        ) : (
          <></>
        )}
        {isModal ? (
          <div className="w-full h-full absolute bg-black opacity-50 z-10"></div>
        ) : (
          <></>
        )}
        <HeaderLogo txt="마이페이지" menuHandler={menuHandler} />
        <div className="flex justify-center mt-5">
          {/* 사용자 프로필 이미지, 닉네임, 배터리 요소 전달 */}
          {/* 데이터 패칭 후 해당 요소를 data 등으로 묶어서 보낼 것 */}
          <MyInfo
            profile={userData.img}
            nickname={userData.nickname}
            charge={userData.charge}
          />
        </div>
        <div className="flex justify-center mt-5">
          <ArounderRecord data={data} openModal={openModal} />
        </div>
      </div>
      {/* 드로워 */}
      {isDrawer ? (
        <div className="h-full absolute z-20 top-[55px] right-0">
          <Drawer />
        </div>
      ) : (
        <></>
      )}
      {/* 모달창 */}
      {isModal ? (
        // 모달이 현재 창과 겹치기 위해 absolute 및 top, left값을 지정
        // 더 좋은 리팩토링 방향이 있으면 코멘트 바랍니다.
        <div className="absolute z-20 top-[200px] left-[50px]">
          <Modal handleClose={closeModal} setScore={setScore} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MypageTemplate;
