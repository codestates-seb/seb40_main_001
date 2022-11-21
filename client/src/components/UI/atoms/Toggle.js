import React from 'react';
import { ReactComponent as ToggleAll } from '../../../assets/img/icons/toggleAll.svg';
import { ReactComponent as Woman } from '../../../assets/img/icons/woman.svg';
import { ReactComponent as Man } from '../../../assets/img/icons/man.svg';

const Toggle = ({ gender = true, toggleClick }) => {
  return (
    <div className="form-control flex flex-row items-center">
      <ToggleAll className="mr-2" />
      <input
        type="checkbox"
        className="toggle toggle-lg bg-main-week border-main-week"
        onClick={toggleClick}
      />
      {gender ? <Woman /> : <Man />}
    </div>
  );
};

export default Toggle;
