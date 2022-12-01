import React from 'react';
import { ImgAdd } from '../../../assets/img';

const ImgAddBtn = ({ handleFile }) => {
  return (
    <>
      <label htmlFor="profile">
        <ImgAdd />
      </label>
      <input
        id="profile"
        type="file"
        className="hidden"
        onChange={handleFile}
      />
    </>
  );
};

export default ImgAddBtn;
