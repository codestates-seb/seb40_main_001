import React from 'react';
import HistoryCL from '../molecules/HistoryCards';

const ArounderRecord = ({ data, openModal }) => {
  /*
    target, date, nickname, exercise, krExercise
    runnung,yoga,tennis,swim,weight,basketball
    */

  return (
    <div className="flex flex-col justify-center">
      <div className="font-bold text-300 ml-[5px] mb-8">어라운드 기록</div>
      {data.map((el, idx) => {
        return (
          <div key={idx} className="mb-[16px]">
            <HistoryCL key={idx} data={el} openModal={openModal} />
          </div>
        );
      })}
    </div>
  );
};

export default ArounderRecord;
