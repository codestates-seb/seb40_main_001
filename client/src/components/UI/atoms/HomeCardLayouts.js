import React from 'react';

const HomeCL = ({ data, source, contentClick }) => {
  const userId = +localStorage.getItem('memberId');
  const { exerciseId } = data;
  const checkWriter = data.host.memberId;

  const checkWriterHandler = () => {
    if (checkWriter === userId) {
      return 'arounderw';
    }
    return 'arounderv';
  };

  return (
    <div
      onClick={e => contentClick(e, exerciseId, checkWriterHandler())}
      className="card w-[350px] h-[150px] bg-white card-bordered border-2 border-main drop-shadow-lg rounded-[20px] hover:scale-105 transition duration-400"
    >
      {source}
    </div>
  );
};

export default HomeCL;
