import React, { useState } from 'react';
import DropdownCity from './DropdownCity';

const TownSelect = () => {
  const [city, setCity] = useState('강남구');

  return (
    <div className="flex flex-col text-left py-2">
      <label className="text font-bold text-200 mb-1">동네선택</label>
      <DropdownCity city={city} setCity={setCity} />
    </div>
  );
};

export default TownSelect;
