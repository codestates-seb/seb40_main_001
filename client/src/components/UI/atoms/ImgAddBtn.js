import React from 'react';
import { ReactComponent as ImgAdd } from '../../../assets/img/icons/imgAdd.svg';

const ImgAddBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="absolute transform translate-y-16 -translate-x-7"
    >
      <ImgAdd />
    </button>
  );
};

export default ImgAddBtn;
