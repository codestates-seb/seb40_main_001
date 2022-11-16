import { React } from 'react';

const CheckingPassword = ({ id }) => {
  return (
    <input
      id={id}
      type="password"
      placeholder="비밀번호 확인"
      className="bg-gray input w-[338px] h-[59px] rounded-[7px] focus:outline-main "
    />
  );
};

export default CheckingPassword;
