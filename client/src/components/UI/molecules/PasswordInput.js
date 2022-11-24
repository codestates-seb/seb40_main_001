import React from 'react';

const PasswordInput = ({ register = { name: 'password' }, errors }) => {
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="Nickname" className="text font-bold text-200 mb-1">
        비밀번호
      </label>
      <input
        type={register.name}
        placeholder={`비밀번호를 입력해주세요`}
        className={`
      ${
        errors.password
          ? 'focus:outline-red border-2 border-red '
          : 'focus:outline-main '
      }
      bg-gray input w-[338px] h-[59px] rounded-[7px] outline-red`}
        {...register}
      />
      {errors.password && (
        <div className="text-sm text-err mt-1 ml-1">
          {errors.password.message}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
