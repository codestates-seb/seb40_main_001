import React from 'react';
import { ReactComponent as CommentDelete } from '../../../assets/img/icons/commentDelete.svg';

const CommentDeleteBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <CommentDelete />
    </button>
  );
};

export default CommentDeleteBtn;
