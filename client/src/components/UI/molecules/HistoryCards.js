import React, { useEffect, useState } from 'react';
import { ShortBtn, HNM } from '../atoms';
import getIcon from '../../../utils/getIcon';

const HistoryCL = ({ data, openModal }) => {
  // 운동 한글화
  const [isExercise, setIsExercise] = useState('');
  // 리뷰 완료 여부
  const [reviewed, setReviewed] = useState(data.isReviewed);
  // 유저 ID
  // eslint-disable-next-line no-unused-vars
  const [myId, setMyId] = useState(+localStorage.getItem('memberId'));
  // 운동 상대
  const [partner, setPartner] = useState();

  const reviewHandler = () => {
    if (data.participant.memberId === myId) {
      openModal(data.exerciseId, data.host.memberId);
      setReviewed(true);
    } else if (data.host.memberId === myId) {
      openModal(data.exerciseId, data.participant.memberId);
      setReviewed(true);
    }
  };

  const reviewing = () => {
    return reviewed ? '리뷰완료' : '리뷰하기';
  };

  const icon = getIcon(data && data.category, '#7FD1AE');
  const reviewTxt = reviewing();

  useEffect(() => {
    if (data) {
      setIsExercise(() => {
        switch (data.category) {
          case 'RUNNING':
            return '러닝';
          case 'YOGA':
            return '요가';
          case 'BADMINTON':
            return '배드민턴';
          case 'SWIMMING':
            return '수영';
          case 'FITNESS':
            return '헬스';
          case 'BASKETBALL':
            return '농구';
          default:
            return 'null';
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if (data.participant.memberId === myId) {
      if (data.host.image) {
        console.log('host img');
        setPartner({
          image: data.host.image.remotePath,
          nickname: data.host.nickname,
        });
      } else {
        console.log('host non img');
        setPartner({
          image: '',
          nickname: data.host.nickname,
        });
      }
    } else if (data.host.memberId === myId) {
      if (data.participant.image) {
        console.log('part img');
        setPartner({
          image: data.participant.image.remotePath,
          nickname: data.participant.nickname,
        });
      } else {
        console.log('part non img');
        setPartner({
          image: '',
          nickname: data.participant.nickname,
        });
      }
    } else {
      console.log('너 내가 누군지 아니');
    }
  }, [data]);

  return (
    <div className="flex flex-low justify-between w-[350px] h-[92px]  bg-white items-center drop-shadow-lg rounded-[5px]">
      <div className="ml-[20px] flex flex-row">
        <HNM target={partner && partner.image} />
        <div className="flex flex-col ml-[15px] text-300">
          <div className="flex flex-row items-end">
            <div className="text-300 text-default mr-[10px] max-w-[70px] truncate">{`${
              partner && partner.nickname
            }`}</div>
            <div className="text-200 text-low">{`${
              data &&
              new Date(data.exerciseAt)
                .toLocaleDateString('ko')
                .replace(' ', '')
            }`}</div>
          </div>

          <div className="flex flex-row items-center">
            <div>{icon}</div>
            <div className="text-200 font-bold text-exercise">{`${
              data && isExercise
            }`}</div>
          </div>
        </div>
      </div>
      <div className="mr-[20px]">
        <ShortBtn
          txt={reviewTxt}
          handleClick={reviewHandler}
          disabled={data && data.isReviewed}
        />
      </div>
    </div>
  );
};

export default HistoryCL;
