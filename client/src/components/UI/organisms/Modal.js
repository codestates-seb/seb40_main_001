import React, { useEffect, useState } from 'react';
import { MiniBtn } from '../atoms';
import { ArounderReview, ReviewMent } from '../molecules';

const Modal = ({ handleClose, setScore, setIsModal }) => {
  const [review, setReview] = useState();
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

  const rate = index => {
    switch (index) {
      case -1:
        return 2;
      case 4:
        return 1;
      case 3:
        return 0;
      case 2:
        return -1;
      case 1:
        return -2;
      default:
        return 0;
    }
  };

  const handleConfirm = () => {
    // colorOne.indexOf('white');
    // colorTwo.indexOf('white');
    // 위 2개의 값이 리뷰 점수
    // -1인 경우 5점으로 치환
    // 상위 컴포넌트에서 내려온 score state에 값 담기
    handleClose();
  };

  useEffect(() => {
    if (colorOne[0] !== 'white' && colorTwo[0] !== 'white') {
      setIsDisabled(false);
    }
    const first = colorOne.indexOf('white');
    const second = colorTwo.indexOf('white');
    setReview([rate(first), rate(second)]);
  }, [colorOne, colorTwo]);

  useEffect(() => {
    setScore(review);
  }, [review]);

  return (
    <div className="w-[290px] h-[350px] flex flex-col bg-white rounded-2xl p-5">
      <div className="flex justify-end mb-1">
        <ArounderReview setIsModal={setIsModal} />
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
