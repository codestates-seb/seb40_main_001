import { React } from 'react';

const CheckingPassword = ({ target }) => {
  return (
    <input
      type="text"
      placeholder={`${target}`}
      className="bg-gray input w-[338px] h-[59px] rounded-[7px] focus:outline-main "
    />
  );
};

export default CheckingPassword;
