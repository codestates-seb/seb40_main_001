import React from 'react';
import { CommentDelete } from '../../../assets/img';

const CommentDeleteBtn = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <CommentDelete />
    </button>
  );
};

export default CommentDeleteBtn;
