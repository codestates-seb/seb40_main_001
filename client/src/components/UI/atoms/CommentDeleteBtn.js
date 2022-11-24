import React from 'react';
import { CommentDelete } from '../../../assets/img';

const CommentDeleteBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <CommentDelete />
    </button>
  );
};

export default CommentDeleteBtn;
