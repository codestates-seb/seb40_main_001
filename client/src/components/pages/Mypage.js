import React, { useEffect, useState } from 'react';
import { HeaderLogo, MyInfo, ArounderRecord, Modal, Drawer } from '../UI';
import { client, clientImg } from '../../client/client';

const Mypage = () => {
  const [userData, setUserData] = useState();
  const [data, setData] = useState();
  const [infoData, setInfoData] = useState();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [exerciseId, setExerciseId] = useState(0);
  const [destId, setDestId] = useState(0);
  const [score, setScore] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(localStorage.getItem('memberId'));

  const closeModal = () => {
    const payload = {
      destMemberId: destId,
      publicEvaluation: score[0],
      privateEvaluation: score[1],
    };
    client
      .post(`/exercises/${exerciseId}/reviews`, payload)
      .then(() => {
        setIsModal(false);
      })
      .catch(e => {
        if (e.response) {
          if (e.response.data.message === 'End time is not passed') {
            alert('운동 시간이 아직 종료되지 않았습니다.');
            setIsModal(false);
            window.location.reload();
          } else {
            alert(e.response.data.message);
          }
        }
      });
  };

  const openModal = (id, dest) => {
    setIsModal(true);
    setExerciseId(id);
    setDestId(dest);
  };

  const menuHandler = () => {
    setIsDrawer(!isDrawer);
  };

  const editProfile = payload => {
    client.patch(`/members/${userId}`, payload).then(() => {
      alert('프로필 사진이 변경되었습니다.');
      window.location.reload();
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
    console.log('here');
    client
      .get('/members/profiles')
      .then(res => {
        setData(res.data.exerciseRecord);
        const user = {
          nickname: res.data.nickname,
          charge: res.data.publicEvaluation,
          addressId: res.data.address.addressId,
        };
        setUserData(user);
        return user;
      })
      .then(response => {
        client.get('/members/info').then(res => {
          setUserData(prev => {
            const newData = prev;
            if (res.data.image) {
              newData.profile = res.data.image.remotePath;
            }
            return newData;
          });
          setInfoData({
            profile: res.data.image.remotePath || '',
            nickname: response.nickname,
            charge: response.charge,
          });
        });
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="relative h-screen scrollbar-hide">
      {isModal ? (
        <div className="w-full h-full absolute bg-black opacity-50 z-10"></div>
      ) : (
        <></>
      )}
      <HeaderLogo txt="마이페이지" menuHandler={menuHandler} menu={true} />

      <div className="flex justify-center mt-[55px]">
        <MyInfo
          infoData={infoData}
          setUserData={setUserData}
          changeName={changeName}
          imageHandler={imageHandler}
        />
      </div>
      <div className="flex justify-center items-center mt-5">
        <ArounderRecord data={data} openModal={openModal} />
      </div>

      {/* 드로워 */}
      {isDrawer ? (
        // h-full 하면 top-55px 밀리니까 이거 계산해서 넣어주기
        <div className="h-screen w-[390px] fixed z-20 top-[55px]">
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
