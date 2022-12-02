import React from 'react';
import { Datepicker } from '../atoms';

const WriteDate = ({ start, data, handler }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-low text-300">{start ? '시작시간' : '종료시간'}</div>
      <Datepicker start={start} data={data} handler={handler} />
    </div>
  );
};

export default WriteDate;
