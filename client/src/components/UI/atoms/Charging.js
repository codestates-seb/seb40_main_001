import React from 'react';

const Charging = ({ level }) => {
  let size = 'w-4 h-[19px] mr-[1px]';

  if (level <= 25) {
    size += ' bg-main-red';
  } else if (level > 25 && level < 50) {
    size += ' bg-yellow';
  } else {
    size += ' bg-green';
  }

  return <div className={size}></div>;
};

export default Charging;
