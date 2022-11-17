import React, { useEffect, useState } from 'react';
import { MiniBtn } from '../atoms';
import { ArounderReview, ReviewMent } from '../molecules';

const Modal = ({ handleClose, setScore }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [colorOne, setColorOne] = useState([
    'white',
    'white',
    'white',
    'white',
    'white',
  ]);
  const [colorTwo, setColorTwo] = useState([
    'white',
    'white',
    'white',
    'white',
    'white',
  ]);

  const handleConfirm = () => {
    // colorOne.indexOf('white');
    // colorTwo.indexOf('white');
    // 위 2개의 값이 리뷰 점수
    // -1인 경우 5점으로 치환
    let first = colorOne.indexOf('white');
    let second = colorTwo.indexOf('white');
    if (first === -1) first = 5;
    if (second === -1) second = 5;

    // 상위 컴포넌트에서 내려온 score state에 값 담기
    setScore([first, second]);
  };

  useEffect(() => {
    if (colorOne[0] !== 'white' && colorTwo[0] !== 'white') {
      setIsDisabled(false);
    }
  }, [colorOne, colorTwo]);

  return (
    <div className="w-[290px] h-[350px] flex flex-col bg-white rounded-2xl p-5">
      <div className="flex justify-end mb-1">
        <ArounderReview handleClick={handleClose} />
      </div>
      <div className="mt-5">
        <ReviewMent
          color={colorOne}
          setColor={setColorOne}
          ment="함께 운동한 친구는 어땠나요?"
        />
      </div>
      <div className="my-5">
        <ReviewMent
          color={colorTwo}
          setColor={setColorTwo}
          ment="함께 운동한 친구가 나와 잘 맞았나요?"
        />
      </div>
      <div className="flex justify-center">
        <MiniBtn disabled={isDisabled} handleClick={handleConfirm} />
      </div>
    </div>
  );
};

export default Modal;
