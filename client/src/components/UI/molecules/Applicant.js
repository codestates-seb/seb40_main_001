import React, { useState } from 'react';
import Applicant from '../atoms/Applicant';
import { ShortBtn } from '../atoms';

const ApplicantSet = ({ dummyData, writer }) => {
  const [together, setTogether] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);
  const buttonHandler = () => {
    setTogether(!together);
  };

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
          if (writer) {
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
          }
          if (!writer) {
            return (
              <>
                <div
                  key={id}
                  className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                >
                  <Applicant target={x.target} />
                  <div className="text-center w-[50px] text-200 truncate">
                    {x.nickname}
                  </div>
                </div>
              </>
            );
          }
          return <></>;
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
