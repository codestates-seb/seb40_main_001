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

// 응답 인터셉터
client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorMSG = error.response.data.message;

    if (errorMSG === 'Unauthorized') {
      client
        .post('/auth/refresh')
        .then(res => {
          const token = res.headers.get('Authorization');
          client.defaults.headers.Authorization = token;
          localStorage.setItem('accessToken', res.headers.get('Authorization'));
          window.location.reload();
        })
        .catch(err => {
          const errorDetail = err.response.data.message;
          if (
            errorDetail === 'Jwt token has expired' ||
            errorDetail === 'Required request cookie is missing'
          ) {
            preClient.post('/auth/logout');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('memberId');
            window.location.assign('/login');
          }
        });
    }
    return Promise.reject(error);
  },
);

// 요청 인터셉터
clientImg.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
clientImg.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorMSG = error.response.data.message;

    if (errorMSG === 'Unauthorized') {
      client
        .post('/auth/refresh')
        .then(res => {
          const token = res.headers.get('Authorization');
          clientImg.defaults.headers.Authorization = token;
          localStorage.setItem('accessToken', res.headers.get('Authorization'));
          window.location.reload();
        })
        .catch(err => {
          const errorDetail = err.response.data.message;

          if (
            errorDetail === 'Jwt token has expired' ||
            errorDetail === 'Required request cookie is missing'
          ) {
            preClient.post('/auth/logout');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('memberId');
            window.location.assign('/login');
          }
        });
    }
    return Promise.reject(error);
  },
);
