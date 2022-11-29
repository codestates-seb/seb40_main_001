import React, { useEffect, useState } from 'react';
import { DownArrow } from '../../../assets/img';
import { client } from '../../../client/client';

const Dropdown = ({ setAddress }) => {
  const [city, setCity] = useState([]);

  const [selectedCity, setSelectedCity] = useState('강남구');
  const getCities = () => {
    client.get('/addresses').then(res => {
      setCity(res.data.data);
    });
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleClick = (e, idx) => {
    setSelectedCity(e.firstChild.data);
    setAddress(idx);
  };
  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="w-[78px] h-[30px] btn m-1 rounded-[7px] border-2 border-main bg-white text text-200 p-[2px] hover:bg-white hover:border-2 hover:border-main"
      >
        {selectedCity}
        <DownArrow />
      </label>
      <ul
        tabIndex={0}
        className="block h-[200px] dropdown-content menu shadow w-[78px] bg-white text text-200 rounded-box overflow-y-scroll"
      >
        {city.map((data, idx) => (
          <li key={idx} onClick={e => handleClick(e.target, data.addressId)}>
            <a className="active:bg-main active:text-white">{data.sigungu}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
