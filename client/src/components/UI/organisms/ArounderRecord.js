import React from 'react';
import HistoryCL from '../molecules/HistoryCards';

const ArounderRecord = ({ modalControl }) => {
  /*
    target, date, nickname, exercise, krExercise
    runnung,yoga,tennis,swim,weight,basketball
    */
  const dummyData = [
    {
      target:
        'https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/4jyM/image/ApCGVgNo3Rh-6DT433umzzxSg9o.jpg',

      date: '2022.11.07',
      nickname: '앤디',
      exercise: 'weight',
      krExercise: '크로스핏',
    },
    {
      target:
        'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
      date: '2022.11.07',
      nickname: '헬리',
      exercise: 'basketball',
      krExercise: '농구',
    },
    {
      target: 'https://pbs.twimg.com/media/EdTEFR8UwAInwNl.png',
      date: '2022.10.31',
      nickname: '루모스루모스루모스',
      exercise: 'swim',
      krExercise: '수영',
    },
    {
      target: 'https://pbs.twimg.com/media/FACQ9-hUcAcA_11.jpg',
      date: '22.10.30',
      nickname: '큐원',
      exercise: 'running',
      krExercise: '런닝',
    },
    {
      target:
        'https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a69870a8a0d4fb299d4636c753d0b63f3b91a57816434dd21697483bf942d5d549',
      date: '22.10.29',
      nickname: '가형',
      exercise: 'yoga',
      krExercise: '요가',
    },
    {
      target:
        'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/TrbRquy4TZ1rvMVYBYaIXp0cTxo.jpg',
      date: '22.10.08',
      nickname: '유정',
      exercise: 'tennis',
      krExercise: '테니스',
    },
  ];
  return (
    <div className="flex flex-col justify-center">
      <div className="font-bold text-300 ml-[5px] mb-8">어라운드 기록</div>
      {dummyData.map((el, idx) => {
        return (
          <div key={idx} className="mb-[16px]">
            <HistoryCL key={idx} data={el} modalControl={modalControl} />
          </div>
        );
      })}
    </div>
  );
};

export default ArounderRecord;
