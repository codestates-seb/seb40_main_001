import React from 'react';
import DropdownCity from './DropdownCity';

const TownSelect = ({ setcityNum }) => {
  return (
    <div className="flex flex-col text-left py-2">
      <label className="text font-bold text-200 mb-1">동네선택</label>
      <DropdownCity setcityNum={setcityNum} />
    </div>
  );
};

export default TownSelect;
