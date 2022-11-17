import React, { useState } from 'react';
import { Datepicker } from '../atoms';

const WriteDate = ({ start }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex flex-row justify-between">
      <div className="text-low text-300">{start ? '시작시간' : '종료시간'}</div>
      <Datepicker startDate={startDate} setStartDate={setStartDate} />
    </div>
  );
};

export default WriteDate;
