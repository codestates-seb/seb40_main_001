import React, { useEffect, useRef, useState } from 'react';
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
  const [infoData, setInfoData] = useState({});
  const [count, setCount] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const SIZE = 10;
  // 드로워 오픈 여부
  const [isDrawer, setIsDrawer] = useState(false);
  const observerRef = useRef(); // 탐지 대상
  const preventRef = useRef(true); // 중복 체크
  const visited = useRef(false); // 첫방문 여부

  // 햄버거 아이콘 클릭 시 드로워 오픈 여부 변경
  const menuHandler = () => {
    setIsDrawer(!isDrawer);
  };

  const getUserData = async () => {
    const response = await client.get(
      `/exercises?address-id=${address}&category=${category}&gender-type=${gender}&cursorId=100&size=${
        count * SIZE
      }`,
    );

    setHasNext(response.data.hasNext);
    setUserData(response.data.data);
    preventRef.current = true;
    visited.current = true;
  };

  const getUserInfoData = async () => {
    await client.get('/members/info').then(res => {
      localStorage.setItem('memberId', res.data.memberId);
      setInfoData({
        nickname: res.data.nickname,
        image: res.data.image.remotePath,
        gender: res.data.gender,
      });
      setUserId(res.data.memberId);
    });
  };

  const obsHandler = async entries => {
    const target = entries[0];
    if (
      target.isIntersecting &&
      hasNext &&
      preventRef.current &&
      visited.current
    ) {
      preventRef.current = false;
      setCount(cnt => cnt + 1);
    }
  };

  const observerSet = () => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 1 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  };

  const checkToken = async () => {
    if (localStorage.getItem('accessToken') === null) {
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserData();
    checkToken();
    getUserInfoData();
    observerSet();
  }, [address, category, gender, count]);

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

  const handleClick = () => {
    navigate('/write');
  };

  const contentClick = (e, target, checked) => {
    e.preventDefault();
    navigate(`/${checked}/${target}`);
  };

  return (
    // 드로워 위치를 위한 css 추가
    <div className="relative h-screen scrollbar-hide">
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
        <Toggle
          genderToggleClick={genderToggleClick}
          gender={infoData.gender}
        />
      </div>

      <div className="flex flex-col pt-3 items-center space-y-3">
        {userData &&
          userData.map((data, idx) => (
            <HomeContents key={idx} data={data} contentClick={contentClick} />
          ))}
        <div ref={observerRef}></div>
      </div>
      <EditBtn handleClick={handleClick} />
      {/* 드로워 */}
      {isDrawer ? (
        <div className="h-screen absolute z-20 top-[55px] right-0">
          <Drawer img={infoData.image} name={infoData.nickname} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
