import React from 'react';

const CheckPasswordInput = ({
  register = { name: 'passwordCheck' },
  errors,
}) => {
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="passwordCheck" className="text font-bold text-200 mb-1">
        비밀번호 확인
      </label>
      <input
        type="password"
        placeholder={`비밀번호를 확인`}
        className={`
      ${
        errors.passwordCheck
          ? 'focus:outline-red border-2 border-red '
          : 'focus:outline-main '
      }
      bg-gray input w-[338px] h-[59px] rounded-[7px] outline-red`}
        {...register}
      />
      {errors.passwordCheck && (
        <div className="text-sm text-err mt-1 ml-1">
          {errors.passwordCheck.message}
        </div>
      )}
    </div>
  );
};

export default CheckPasswordInput;
