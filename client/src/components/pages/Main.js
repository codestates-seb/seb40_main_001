import React, {
  useEffect,
  // useState
} from 'react';

import {
  HeaderLogo,
  ExerciseCarousel,
  MiniDropdown,
  Toggle,
  HomeContents,
} from '../UI';
import { Info } from '../../assets/img';
// import client from '../../client/client';

const dummyData = [
  {
    title: '수영 빡고수 찾습니다!!',
    profile:
      'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    nickname: '루모스',
    createDate: '2022.11.22',
    endDate: '2022.11.23',
    contents: `접영 가능한 사람 구합니다. 접영 알려주시면 좋겠어요. 제가 수영 초보라 자세 교정해주실 분!!!!`,
    img: 'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    exercise: 'swim',
  },
  {
    title: '같이 배드민턴 치실분?!!',
    profile:
      'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    nickname: '헬리',
    createDate: '2022.11.18',
    endDate: '2022.11.19',
    contents: `일요일 오후 4시부터 서울숲에서 같이 해요! 댓글에 연락수단 말씀해주시면 대댓글로 남겨드릴게요! 참고로 농구 초보입니다 >< !`,
    img: 'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    exercise: 'basketball',
  },
  {
    title: '수영 빡고수 찾습니다!!',
    profile:
      'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    nickname: '루모스',
    createDate: '2022.11.22',
    endDate: '2022.11.23',
    contents: `접영 가능한 사람 구합니다. 접영 알려주시면 좋겠어요. 제가 수영 초보라 자세 교정해주실 분!!!!`,
    img: 'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
    exercise: 'swim',
  },
];

// const [userData, setUserData] = useState([]);
// const [address, setAddress] = useState();
// const [gender, setGender] = useState();
// const [category, setCategory] = useState();

const getUserData = async () => {
  // const response = await client.get(`/exercises?address=${1}&gender-type=${ALL}&category=${FITNESS}`);
  // setUserData( );
};

useEffect(() => {
  getUserData();
}, []);

const Main = () => {
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
        arr={[
          'all',
          'running',
          'yoga',
          'tennis',
          'swim',
          'weight',
          'basketball',
        ]}
      />
      <div className="flex justify-between border-t border-main pt-2 mx-5">
        <MiniDropdown />
        <Toggle />
      </div>

      <div className="flex flex-col pt-3 items-center space-y-3">
        {/* 임시로 넣어놓았습니다. */}
        {dummyData.map((data, idx) => (
          <HomeContents key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Main;
