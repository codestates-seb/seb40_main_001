import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { HeaderLogo, HeaderNone, IdInput, PasswordInput, LongBtn } from '../UI';
import { preClient, client, clientImg } from '../../client/client';

const Login = () => {
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = ({ text, password }) => {
    const payload = {
      email: text,
      password,
    };
    preClient
      .post('/auth/login', payload)
      .then(res => {
        if (res.headers.get('Authorization')) {
          const token = res.headers.get('Authorization');
          client.defaults.headers.Authorization = token;
          clientImg.defaults.headers.Authorization = token;
          localStorage.setItem('accessToken', res.headers.get('Authorization'));
          alert('로그인 성공');
        }
        naviagte('/main');
      })
      .catch(err => {
        const errMSG = err.response.data.message;
        alert(errMSG);
      });
  };
  const onInValid = error => {
    console.log(error);
  };

  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="로그인" />
      <form
        className="flex flex-col items-center space-y-8 mt-9"
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <IdInput
          register={register('text', {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식으로 작성해주세요!',
            },
          })}
          errors={errors}
        />
        <PasswordInput
          register={register('password', {
            required: true,
            minLength: {
              value: 8,
              message: '최소 8자 이상의 숫자를 입력해주세요!',
            },
            pattern: {
              value:
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/,
              message: '영문 대,소 문자, 숫자, 특수문자를 포함하여 주세요!',
            },
          })}
          errors={errors}
        />
        <div className="pt-28">
          <LongBtn txt="로그인" type="button" />
        </div>
      </form>
      <div className="text-200 mt-4 text-center">
        회원이 아니신가요?
        <button
          className="font-bold ml-1"
          onClick={() => {
            naviagte('/register');
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
