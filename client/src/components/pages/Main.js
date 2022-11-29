import React, { useEffect, useState } from 'react';
import {
  HeaderLogo,
  ExerciseCarousel,
  MiniDropdown,
  Toggle,
  HomeContents,
} from '../UI';
import { Info } from '../../assets/img';
import client from '../../client/client';
// 할일
// 인포 api 들어오면 성별에 따라 토글 아이콘 바꾸기
// 주소체계 api 들어오면 바꾸기
// api에 따라 주소 디폴트값주기
// 분기처리

const Main = () => {
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState(3);
  const [gender, setGender] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const getUserData = async () => {
    const response = await client.get(
      `/exercises?address-id=${address}&category=${category}&gender-type=${gender}&cursorId=100&size=100`, // http://3.36.23.248:8080/exercises?address-id=1&category=ALL&gender-type=ALL&size=10
    );
    setUserData(response.data.data);
  };

  const genderToggleClick = () => {
    if (gender === 'ALL') {
      setGender('SAME');
    } else {
      setGender('ALL');
    }
  };
  const handler = (target, exercise) => {
    setCategory(exercise);
  };

  useEffect(() => {
    getUserData();
  }, [address, category, gender]);

  return (
    <div>
      <HeaderLogo txt="어라운더 찾기">
        <div
          className="tooltip tooltip-bottom"
          data-tip="어라운더란? 같이 운동할 동네친구"
        >
          <Info />
        </div>
      </HeaderLogo>
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
        <Toggle genderToggleClick={genderToggleClick} />
      </div>

      <div className="flex flex-col pt-3 items-center space-y-3">
        {userData.map((data, idx) => (
          <HomeContents key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Main;
