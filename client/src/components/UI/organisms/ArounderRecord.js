import React, { useEffect, useState } from 'react';
import HistoryCL from '../molecules/HistoryCards';

const ArounderRecord = ({ data, openModal }) => {
  const [participant, setParticipant] = useState();

  useEffect(() => {
    if (data) {
      const newRecord = data.filter(el => el.participant);
      setParticipant(newRecord);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="font-bold text-300 ml-5 mb-8">어라운드 기록</div>
      <div className="flex flex-col items-center">
        {participant &&
          participant.map((el, idx) => {
            return (
              <div key={idx} className="mb-[16px]">
                <HistoryCL key={idx} data={el} openModal={openModal} />
              </div>
            );
          })}
        {participant && participant.length === 0 ? (
          <div className="ml-[5px]">아직 운동하지 않았어요!</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ArounderRecord;
