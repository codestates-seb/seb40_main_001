import React from 'react';
import { Delete } from '../../../assets/img';

const DeleteBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <Delete />
    </button>
  );
};

export default DeleteBtn;
