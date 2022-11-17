import React from 'react';
import { ReactComponent as Delete } from '../../../assets/img/icons/delete.svg';

const DeleteBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <Delete />
    </button>
  );
};

export default DeleteBtn;
