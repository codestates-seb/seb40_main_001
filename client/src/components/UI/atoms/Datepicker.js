import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const DatepickerModule = ({ start, data, handler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(data);

  const handleClick = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = e => {
    const name = start ? 'startTime' : 'endTime';
    const offset = e.getTimezoneOffset() * 60000; // ms단위라 60000곱해줌
    const dateOffset = new Date(e.getTime() - offset);
    handler(name, dateOffset.toISOString());
    setStartDate(e);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setStartDate(new Date(data));
  }, [data]);

  return (
    <div className="flex flex-col items-end">
      <button
        className="bg-white rounded-[7px] w-[130px] h-[30px] text text-200 border border-main"
        onClick={handleClick}
      >
        {format(startDate, 'yyyy.MM.dd.HH:mm')}
      </button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          showTimeSelect
          locale={ko}
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          inline
        />
      )}
    </div>
  );
};

export default DatepickerModule;
