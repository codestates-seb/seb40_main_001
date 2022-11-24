import React from 'react';
import { Update } from '../../../assets/img';

const UpdateBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <Update />
    </button>
  );
};

export default UpdateBtn;
