import React, { useState } from 'react';
import Applicant from '../atoms/Applicant';
import { ShortBtn } from '../atoms';

const ApplicantSet = () => {
  const [together, setTogether] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);
  const buttonHandler = () => {
    setTogether(!together);
  };

  const dummyData = [
    {
      id: 0,
      target:
        'https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/4jyM/image/ApCGVgNo3Rh-6DT433umzzxSg9o.jpg',
      nickname: '앤디',
    },
    {
      id: 1,
      target:
        'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
      nickname: '헬리',
    },
    {
      id: 2,
      target: 'https://pbs.twimg.com/media/EdTEFR8UwAInwNl.png',
      nickname: '루모스루모스루모스루모스루모스루모스',
    },
    {
      id: 3,
      target: 'https://pbs.twimg.com/media/FACQ9-hUcAcA_11.jpg',
      nickname: '큐원',
    },
    {
      id: 4,
      target:
        'https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a69870a8a0d4fb299d4636c753d0b63f3b91a57816434dd21697483bf942d5d549',
      nickname: '가형',
    },
    {
      id: 5,
      target:
        'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/TrbRquy4TZ1rvMVYBYaIXp0cTxo.jpg',
      nickname: '유정',
    },
  ];

  const profileHandler = id => {
    const profiles = new Array(dummyData.length).fill(false);
    profiles[id] = true;
    setCheckProfile(profiles);
  };

  const txt = together ? '완료' : '함께하기';
  return (
    <div className="flex flex-row w-[350px]">
      <div className="carousel overflow-x-scroll flex items-center justify-between">
        {dummyData.map((x, id) => {
          return !checkProfile[id] ? (
            <>
              <div
                key={id}
                className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                onClick={() => profileHandler(id)}
              >
                <Applicant target={x.target} />
                <div className="text-center w-[50px] text-200 truncate">
                  {x.nickname}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                key={id}
                className="flex flex-col  justify-center items-center mr-[5px] opacity-100"
                onClick={() => profileHandler(id)}
              >
                <Applicant target={x.target} />
                <div className="text-center w-[50px] text-200 truncate items-center">
                  {x.nickname}
                </div>
              </div>
            </>
          );
        })}
      </div>{' '}
      <div className="flex items-center">
        <ShortBtn
          txt={txt}
          handleClick={buttonHandler}
          pink={!together}
          disabled={together}
        />
      </div>
    </div>
  );
};

export default ApplicantSet;
