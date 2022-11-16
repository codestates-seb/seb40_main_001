import React from 'react';
import { ReactComponent as Edit } from '../../../assets/img/icons/edit.svg';

const EditBtn = () => {
  return (
    <button className="w-[55px] h-[55px] btn btn-circle drop-shadow bg-main-red hover:bg-main-red">
      <Edit />
    </button>
  );
};

export default EditBtn;
