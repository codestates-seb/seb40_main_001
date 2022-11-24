import React from 'react';

const NickNameInput = ({ register = { name: 'nickname' }, errors }) => {
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="Nickname" className="text font-bold text-200 mb-1">
        닉네임
      </label>
      <input
        type={register.name}
        placeholder={`닉네임을 입력해주세요`}
        className={`
      ${
        errors.nickname
          ? 'focus:outline-red border-2 border-red '
          : 'focus:outline-main '
      }
      bg-gray input w-[338px] h-[59px] rounded-[7px] outline-red`}
        {...register}
      />
      {errors.nickname && (
        <div className="text-sm text-err mt-1 ml-1">
          {errors.nickname.message}
        </div>
      )}
    </div>
  );
};

export default NickNameInput;
