import React from 'react';
import { Edit } from '../../../assets/img';

const EditBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-12 right-10 w-[55px] h-[55px] btn btn-circle drop-shadow bg-main-red hover:bg-main-red"
    >
      <Edit />
    </button>
  );
};

export default EditBtn;
