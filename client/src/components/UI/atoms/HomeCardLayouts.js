import React from 'react';
import { useRecoilValue } from 'recoil';
import userInfoState from '../../../recoil/atoms';

const HomeCL = ({ data, source, contentClick }) => {
  const exerciseId = data.host.memberId;
  const userId = useRecoilValue(userInfoState);
  return (
    <div
      onClick={e => contentClick(e, exerciseId, userId)}
      className="card w-[350px] h-[150px] bg-white card-bordered border-2 border-main drop-shadow-lg rounded-[20px] hover:scale-105 transition duration-400"
    >
      {source}
    </div>
  );
};

export default HomeCL;
