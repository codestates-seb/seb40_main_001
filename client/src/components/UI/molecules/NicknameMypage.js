import React, { useState } from 'react';
import { ReactComponent as Edit } from '../../../assets/img/icons/update.svg';
import { ReactComponent as Confirm } from '../../../assets/img/icons/confirm.svg';

const NicknameMypage = ({ nickname }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(nickname);

  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  if (isEdit) {
    return (
      <div className="flex flex-row items-center">
        <input
          className="text text-300 border-b bg-transparent outline-none"
          value={name}
          onChange={handleChange}
        ></input>
        <Confirm onClick={handleClick} />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row text text-300">
        안녕하세요!&nbsp;<div className="font-bold">{name}</div>님
      </div>
      <Edit onClick={handleClick} />
    </div>
  );
};

export default NicknameMypage;
