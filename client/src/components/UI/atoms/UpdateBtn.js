import React from 'react';
import { ReactComponent as Update } from '../../../assets/img/icons/update.svg';

const UpdateBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <Update />
    </button>
  );
};

export default UpdateBtn;
