import React from 'react';
import { ReactComponent as FileDelete } from '../../../assets/img/icons/fileDelete.svg';

const FileDeleteBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <FileDelete />
    </button>
  );
};

export default FileDeleteBtn;
