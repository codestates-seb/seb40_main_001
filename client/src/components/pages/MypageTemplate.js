import React, { useState } from 'react';
import { HeaderLogo, MyInfo, ArounderRecord, Modal, Drawer } from '../UI';

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
        <HeaderLogo txt="마이페이지" menuHandler={menuHandler} menu={true} />
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
        <div className="fixed top-0 transform translate-x-12 translate-y-64 z-20">
          <Modal handleClose={closeModal} setScore={setScore} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MypageTemplate;
