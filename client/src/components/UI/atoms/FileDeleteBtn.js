import React from 'react';
import { ReactComponent as FileDelete } from '../../../assets/img/icons/fileDelete.svg';

const FileDeleteBtn = ({ idx, handler }) => {
  return (
    <button onClick={() => handler(idx)}>
      <FileDelete />
    </button>
  );
};

export default FileDeleteBtn;
