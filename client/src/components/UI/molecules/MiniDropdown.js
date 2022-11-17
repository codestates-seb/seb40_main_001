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
        className="w-[71px] h-[30px] btn m-1 rounded-[7px] border-2 border-main bg-white text text-200 p-[2px] hover:bg-white hover:border-2 hover:border-main"
      >
        {city}
        <DownArrow />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-white text text-200 rounded-box w-[71px]"
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
