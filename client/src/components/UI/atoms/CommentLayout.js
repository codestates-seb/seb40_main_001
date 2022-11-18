import React from 'react';

const CommentLayout = ({ source }) => {
  return (
    <div className="card flex flex-col w-[319px] h-[70px] bg-white card-bordered border-[1px] border-main rounded-[5px] drop-shadow-lg">
      {source}
    </div>
  );
};

export default CommentLayout;
