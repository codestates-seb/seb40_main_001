import React from 'react';
import { ReactComponent as ImgAdd } from '../../../assets/img/icons/imgAdd.svg';

const ImgAddBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <ImgAdd />
    </button>
  );
};

export default ImgAddBtn;
