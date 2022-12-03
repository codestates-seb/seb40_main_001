import React from 'react';
import { ToggleAll, Woman, Man } from '../../../assets/img';

const Toggle = ({ genderToggleClick, gender }) => {
  return (
    <div className="form-control flex flex-row items-center">
      <ToggleAll className="mr-2" />
      <input
        type="checkbox"
        className="toggle toggle-lg bg-main-week border-main-week"
        onClick={genderToggleClick}
      />
      {gender === 'MAN' ? <Man /> : <Woman />}
    </div>
  );
};

export default Toggle;
