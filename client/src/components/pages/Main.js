import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userInfoState from '../../recoil/atoms';
import {
  HeaderLogo,
  ExerciseCarousel,
  MiniDropdown,
  Toggle,
  HomeContents,
  EditBtn,
  Drawer,
} from '../UI';
import { Info } from '../../assets/img';
import { client } from '../../client/client';

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState(358);
  const [gender, setGender] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const setUserId = useSetRecoilState(userInfoState);
  const [userGender, setUserGender] = useState('');
  // 드로워 오픈 여부
  const [isDrawer, setIsDrawer] = useState(false);

  // 햄버거 아이콘 클릭 시 드로워 오픈 여부 변경
  const menuHandler = () => {
    setIsDrawer(!isDrawer);
  };

  const getUserData = async () => {
    const response = await client.get(
      `/exercises?address-id=${address}&category=${category}&gender-type=${gender}&cursorId=100&size=100`, // http://3.36.23.248:8080/exercises?address-id=1&category=ALL&gender-type=ALL&size=10
    );
    setUserData(response.data.data);
  };
  const getUserInfoData = async () => {
    const response = await client.get('/members/info');
    // nickname, image를 드로워에 내려줘야 함!
    setUserGender(response.data.gender);
    setUserId(response.data.memberId);
  };

  const genderToggleClick = () => {
    if (gender === 'ALL') {
      setGender('SAME');
    } else {
      setGender('ALL');
    }
  };
  // const controlFlowMap = {
  //   SAME: () => setGender('ALL'),
  //   ALL: () => setGender('SAME'),
  // };

  // const genderToggleClick = () => {
  //   return controlFlowMap[gender];
  // };

  const handler = (target, exercise) => {
    setCategory(exercise);
  };

  const handleClick = () => {
    navigate('/write');
  };

  const contentClick = (e, target, checked) => {
    e.preventDefault();
    navigate(`/${checked}/${target}`);
  };

  useEffect(() => {
    getUserInfoData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [address, category, gender]);

  return (
    // 드로워 위치를 위한 css 추가
    <div className="relative h-screen">
      <HeaderLogo txt="어라운더 찾기" menuHandler={menuHandler} menu={true}>
        <div
          className="tooltip tooltip-bottom"
          data-tip="어라운더란? 같이 운동할 동네친구"
        >
          <Info />
        </div>
      </HeaderLogo>
      {/* 배경 흐리게 */}
      {isDrawer ? (
        <div className="w-full h-full absolute bg-black opacity-50 z-10"></div>
      ) : (
        <></>
      )}
      <ExerciseCarousel
        handler={handler}
        arr={[
          'ALL',
          'RUNNING',
          'YOGA',
          'FITNESS',
          'SWIMMING',
          'BASKETBALL',
          'BADMINTON',
        ]}
      />
      <div className="flex justify-between border-t border-main pt-2 mx-5">
        <MiniDropdown setAddress={setAddress} />
        <Toggle genderToggleClick={genderToggleClick} gender={userGender} />
      </div>

      <div className="flex flex-col pt-3 items-center space-y-3">
        {userData.map((data, idx) => (
          <HomeContents key={idx} data={data} contentClick={contentClick} />
        ))}
      </div>
      <EditBtn handleClick={handleClick} />

      {/* 드로워 */}
      {isDrawer ? (
        <div className="h-full absolute z-20 top-[55px] right-0">
          <Drawer />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
