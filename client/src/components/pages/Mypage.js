import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userInfoState from '../../recoil/atoms';
import { HeaderLogo, MyInfo, ArounderRecord, Modal, Drawer } from '../UI';
import { client, clientImg } from '../../client/client';

const Mypage = () => {
  const [userData, setUserData] = useState();
  const [data, setData] = useState();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState('');
  const userId = useRecoilValue(userInfoState);

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

  // eslint-disable-next-line no-unused-vars
  const editProfile = payload => {
    client.patch(`/members/${userId}`, payload);
  };

  const imageHandler = e => {
    // 이미지 생성
    const imgUp = new FormData();
    imgUp.append('image', e.target.files[0], e.target.files[0].name);

    // 이미지 서버로 전송
    clientImg
      .post('/images', imgUp)
      .then(res => {
        const newData = userData;
        newData.imageId = res.data[0].imageId;
        setUserData(newData);
      })
      .then(() => {
        const payload = {
          imageId: userData.imageId,
        };
        editProfile(payload);
      });

    // 제출
  };

  const getHistory = () => {
    client
      .get('/members/profiles')
      .then(res => {
        setUserData({
          nickname: res.data.nickname,
          charge: res.data.publicEvaluation,
          addressId: res.data.address.addressId,
        });
        setData(res.data.exerciseRecord);
      })
      .then(() => {
        client.get('/members/info').then(res => {
          setUserData(prev => {
            const newData = prev;
            if (res.data.image) {
              newData.profile = res.data.image.remotePath;
            }
            return newData;
          });
        });
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="relative h-screen">
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
            userData={userData}
            setUserData={setUserData}
            imageHandler={imageHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <ArounderRecord data={data} openModal={openModal} />
        </div>
      </div>
      {/* 드로워 */}
      {isDrawer ? (
        // h-full 하면 top-55px 밀리니까 이거 계산해서 넣어주기
        <div className="h-full absolute z-20 top-[55px] right-0">
          <Drawer img={userData.profile} name={userData.nickname} />
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

export default Mypage;
