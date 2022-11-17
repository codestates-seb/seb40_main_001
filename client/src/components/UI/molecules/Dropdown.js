import React, { useState } from 'react';
import { ReactComponent as DownArrow } from '../../../assets/img/icons/downArrow.svg';

const Dropdown = () => {
  // state, cities 나중에 props로 받아도록 수정
  const [city, setCity] = useState('강남구');
  const cities = ['강남구', '관악구', '광진구'];

  const handleClick = e => {
    setCity(e.firstChild.data);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="w-[338px] h-[60px] btn m-1 rounded-[7px] border-2 border-main bg-white text text-400 justify-between pl-[22px] pr-[13px] hover:bg-white hover:border-2 hover:border-main"
      >
        {city}
        <DownArrow />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-white text text-400 rounded-box w-[338px]"
      >
        {cities.map(el => (
          <li value={el} key={el} onClick={e => handleClick(e.target)}>
            <a className="active:bg-main active:text-white">{el}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;