import React from 'react';
import { FileDelete } from '../../../assets/img';

const FileDeleteBtn = ({ idx, handler }) => {
  return (
    <button onClick={() => handler(idx)}>
      <FileDelete />
    </button>
  );
};

export default FileDeleteBtn;
