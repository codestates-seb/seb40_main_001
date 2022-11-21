import React, { useState } from 'react';
import Dropdown from './Dropdown';

const TownSelect = () => {
  const [city, setCity] = useState('강남구');

  return (
    <div>
      <div className="text font-bold text-300 mb-1">동네선택</div>
      <Dropdown city={city} setCity={setCity} />
    </div>
  );
};

export default TownSelect;
