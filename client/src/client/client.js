import axios from 'axios';

const accessToken = localStorage.getItem('accessToken') || '';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const preClient = axios.create({
  headers: {
    'Content-Type': `application/json`,
  },
  withCredentials: true,
});

export const clientImg = axios.create({
  headers: {
    Authorization: `${accessToken}`,
    'Content-Type': `multipart/form-data`,
  },
  withCredentials: true,
});
// client
export const client = axios.create({
  headers: {
    Authorization: `${accessToken}`,
    'Content-Type': `application/json`,
  },
  withCredentials: true,
});
// 요청 인터셉터
client.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 만료되기전에 재요청. renew polling
// 정상적인 리프레시토큰이 유지되고 있는데 만료되는 경우에 대한 에러코드가 존재
// 401은 분기처리 하면 안됨.

// 응답 인터셉터
client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorCode = error.code;
    // console.log(error.response.data.message);
    // 토큰 만료 여부 체크!
    // 엑세스토큰이 만료됐다면
    if (errorCode === '만료됐다구') {
      // 백엔드에서 해줌!
      // 그 응답이 성공하면
      // return axios(originalRequest);
      // 실패하면 로그아웃 api 호출
      // return axios.post('/auth/logout');
      // navigate('/login');
    }
    return Promise.reject(error);
  },
);
