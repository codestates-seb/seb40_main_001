import { React } from 'react';

const IdInput = ({ register = { name: 'text' }, errors }) => {
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="ID" className="text font-bold text-200 mb-1">
        아이디
      </label>
      <input
        type={register.name}
        placeholder={`이메일을 입력해주세요`}
        className={`
      ${
        errors.text
          ? 'focus:outline-red border-2 border-red '
          : 'focus:outline-main '
      }
      bg-gray input w-[338px] h-[59px] rounded-[7px]  outline-red`}
        {...register}
      />
      {errors.text && (
        <div className="text-sm text-err mt-1 ml-1">{errors.text.message}</div>
      )}
    </div>
  );
};

export default IdInput;
