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
  const [exerciseId, setExerciseId] = useState(0);
  const [destId, setDestId] = useState(0);
  const [score, setScore] = useState([]);
  const userId = useRecoilValue(userInfoState);

  const closeModal = () => {
    const payload = {
      destMemberId: destId,
      publicEvaluation: score[0],
      privateEvaluation: score[1],
    };
    client.post(`/exercises/${exerciseId}/reviews`, payload);
    setIsModal(false);
    // 제출 후 새로고침을 할 것인가?
  };

  const openModal = (id, dest) => {
    setIsModal(true);
    setExerciseId(id);
    setDestId(dest);
  };

  const menuHandler = () => {
    setIsDrawer(!isDrawer);
  };

  // eslint-disable-next-line no-unused-vars
  const editProfile = payload => {
    client.patch(`/members/${userId}`, payload).then(() => {
      alert('프로필 사진이 변경되었습니다.');
    });
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

    // 제출 후 새로고침을 할 것인가?
  };

  const changeName = () => {
    const payload = {
      nickname: userData.nickname,
    };
    client
      .patch(`/members/${userId}`, payload)
      .then(() => {
        alert('닉네임이 변경되었습니다.');
      })
      .catch(e => {
        if (e.response.data.message === 'Member exists') {
          alert('중복된 닉네임입니다.');
          window.location.reload();
        } else {
          alert('닉네임을 변경하지 못했습니다.');
          window.location.reload();
        }
      });
  };

  const getHistory = () => {
    client
      .get('/members/profiles')
      .then(res => {
        setData(res.data.exerciseRecord);
        setUserData({
          nickname: res.data.nickname,
          charge: res.data.publicEvaluation,
          addressId: res.data.address.addressId,
        });
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
          <MyInfo
            userData={userData}
            setUserData={setUserData}
            changeName={changeName}
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
          <Modal
            handleClose={closeModal}
            setScore={setScore}
            setIsModal={setIsModal}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Mypage;
