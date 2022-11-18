import React from 'react';
import Charging from './Charging';

const BatteryCase = ({ charge }) => {
  let num;
  const chargeCopy = +charge;
  if (chargeCopy < 25) {
    num = 1;
  } else if (chargeCopy < 50) {
    num = 2;
  } else if (chargeCopy < 75) {
    num = 3;
  } else if (chargeCopy < 100) {
    num = 4;
  }

  const arr = new Array(num).fill(0).map((el, idx) => el + idx);

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-[81px] h-[26px] bg-text-disabled p-1 relative">
          <div className="flex flex-row items-center">
            {arr.map(el => (
              <Charging key={el} level={chargeCopy} />
            ))}
          </div>
        </div>
        <div className="w-[81px] text text-300 font-bold text-center absolute">
          {charge}%
        </div>
        <div className="w-[5px] h-3 bg-text-disabled"></div>
      </div>
    </>
  );
};

export default BatteryCase;
